-- =============================================
-- Author:    Ashley Sattler
-- Create date: 07/12/2016
-- Description: This script sums up appropriate budget data and updates table entries
-- =============================================

-- Loop through all states
DECLARE @i int
SET @i = 1
WHILE @i <= 62
	BEGIN
		DECLARE @StateFundsExpended decimal(18,2)
		DECLARE @OtherFundsExpended decimal(18,2)
		DECLARE @LSTA decimal(18,2)
		DECLARE @VersionParentId int
		DECLARE @version int
		DECLARE @ver int
		DECLARE @min decimal(18,2)
		DECLARE @allot decimal(18,2)
		DECLARE @net decimal(18,2)
		DECLARE @allowed decimal(18,2)
		DECLARE @FYmoe1 decimal(18,2)
		DECLARE @FYmoe2 decimal(18,2)
		DECLARE @FYmoe3 decimal(18,2)
		DECLARE @allot1 decimal(18,2)
		DECLARE @allot2 decimal(18,2)

		SET @StateFundsExpended = 0
		SET @OtherFundsExpended = 0
		SET @LSTA = 0
		SET @min = 0
		SET @allot = 0
		SET @net = 0
		SET @allowed = 0

		-- Projects
		DECLARE @Cursor CURSOR
		SET @Cursor = CURSOR FAST_FORWARD
		FOR
			SELECT DISTINCT VersionParentId
			FROM Projects p
			WHERE p.FiscalYearId = 6
				AND p.StateId = @i
				AND p.Active = '1'

		OPEN @Cursor
		FETCH NEXT FROM @Cursor INTO @VersionParentId
		WHILE @@FETCH_STATUS = 0
		BEGIN

			SELECT @version = COUNT(ProjectId)
			FROM Projects p
			WHERE VersionParentId = @VersionParentId

			SET @StateFundsExpended += (
				SELECT ISNULL(SUM(Local), 0)
				FROM ProjectBudgets pb
				INNER JOIN  Projects p
					ON pb.ProjectId = p.ProjectId
				WHERE p.StateId = @i
					AND p.FiscalYearId = 6
					AND p.ProjectVersionId = @version
					AND p.VersionParentId = @VersionParentId
					AND p.Active = 1
			)

			SET @OtherFundsExpended += (
				SELECT ISNULL(SUM(InKind), 0)
				FROM ProjectBudgets pb
				INNER JOIN  Projects p
					ON pb.ProjectId = p.ProjectId
				WHERE p.StateId = @i
					AND p.FiscalYearId = 6
					AND p.ProjectVersionId = @version
					AND p.VersionParentId = @VersionParentId
					AND p.Active = 1
			)

			SET @LSTA += (
				SELECT ISNULL(SUM(LSTA), 0)
				FROM ProjectBudgets pb
				INNER JOIN  Projects p
					ON pb.ProjectId = p.ProjectId
				WHERE p.StateId = @i
					AND p.FiscalYearId = 6
					AND p.ProjectVersionId = @version
					AND p.VersionParentId = @VersionParentId
					AND p.Active = 1
			)

			FETCH NEXT FROM @Cursor INTO @VersionParentId
		END
		CLOSE @Cursor
		DEALLOCATE @Cursor

		-- Admin Projects
		SELECT @ver = COUNT(AdminProjectId)
		FROM AdminProject
		WHERE StateId = @i
			AND FiscalYearId = 6

		SET @StateFundsExpended += (
			SELECT ISNULL(SUM(pb.AdminBudgetLocal), 0)
			FROM AdminProjectBudgets pb
			INNER JOIN  AdminProject p
				ON pb.AdminProjectId = p.AdminProjectId
			WHERE p.StateId = @i
				AND p.FiscalYearId = 6
				AND p.AdminProjectVersionId = @ver
		)

		SET @OtherFundsExpended += (
			SELECT ISNULL(SUM(pb.AdminBudgetInKind), 0)
			FROM AdminProjectBudgets pb
			INNER JOIN  AdminProject p
				ON pb.AdminProjectId = p.AdminProjectId
			WHERE p.StateId = @i
				AND p.FiscalYearId = 6
				AND p.AdminProjectVersionId = @ver
		)

		SET @LSTA += (
			SELECT ISNULL(SUM(pb.AdminBudgetLSTA), 0)
			FROM AdminProjectBudgets pb
			INNER JOIN  AdminProject p
				ON pb.AdminProjectId = p.AdminProjectId
			WHERE p.StateId = @i
				AND p.FiscalYearId = 6
				AND p.AdminProjectVersionId = @ver
		)

		-- match totals
		UPDATE FSR
		SET MatchState = @StateFundsExpended
			, MatchOther = @OtherFundsExpended
			, TotalMatch = @StateFundsExpended + @OtherFundsExpended
		WHERE StateId = @i
			AND FiscalYearId = 6

		-- min match
		SET @allot = (SELECT TOP 1 TotalFederalFunds
			FROM FSR
			WHERE StateId = @i
				AND FiscalYearId = 6
			ORDER BY Version DESC)

		SET @min = (@allot / 0.66) * 0.34

		UPDATE FSR
		SET MinMatch = @min
		WHERE StateId = @i
			AND FiscalYearId = 6

		-- outlays
		SET @net = @LSTA

		UPDATE FSR
		SET FederalShare = @net
		WHERE StateId = @i
			AND FiscalYearId = 6

		-- unob
		UPDATE FSR
		SET UnobligatedBalance = @allot - @net
		WHERE StateId = @i
			AND FiscalYearId = 6

		-- admin
		SET @allowed = @allot * 0.04

		UPDATE FSR
		SET LSTAAllowed = @allowed
			,LSTADifference = @allowed - (SELECT TOP 1 LSTAActual
			FROM FSR
			WHERE StateId = @i
				AND FiscalYearId = 6
			ORDER BY Version DESC)
		WHERE StateId = @i
			AND FiscalYearId = 6

		--minmoe
		SET @FYmoe1 = (SELECT TOP 1 TotalSLAA
			FROM FSR
			WHERE StateId = @i
				AND FiscalYearId = 3
			ORDER BY Version DESC)
		SET @FYmoe2 = (SELECT TOP 1 TotalSLAA
			FROM FSR
			WHERE StateId = @i
				AND FiscalYearId = 4
			ORDER BY Version DESC)
		SET @FYmoe3 = (SELECT TOP 1 TotalSLAA
			FROM FSR
			WHERE StateId = @i
				AND FiscalYearId = 5
			ORDER BY Version DESC)
			
		SET @allot1 = (SELECT TOP 1 TotalFederalFunds
			FROM FSR
			WHERE StateId = @i
				AND FiscalYearId = 7
			ORDER BY Version DESC)
		SET @allot2 = (SELECT TOP 1 TotalFederalFunds
			FROM FSR
			WHERE StateId = @i
				AND FiscalYearId = 6
			ORDER BY Version DESC)
	
		UPDATE FSR
		SET MinMOE = (@FYmoe1 + @FYmoe2 + @FYmoe3) / 3
		WHERE StateId = @i
			AND FiscalYearId = 6

		SET @i += 1
	END