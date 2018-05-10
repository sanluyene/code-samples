-- =============================================
-- Author:    Ashley Sattler
-- Create date: 09/12/2016
-- Updated on: 09/13/2016
-- Description: Provides summary data for Public View Summary Reports
-- EXEC sp_GetSummaryReports 47, 6
-- =============================================
ALTER PROCEDURE [dbo].[sp_GetSummaryReports]
	@StateId int
	,@fyId int
AS
BEGIN
	--SET NOCOUNT ON;
  
	-- Declare table
	DECLARE @Totals TABLE
	(
		TotalProjects int NULL,
		Allotment decimal(18,2) NULL,
		LSTAFundsExpended decimal(18,2) NULL,
		MatchFundsExpended decimal(18,2) NULL,
		LifelongLearning int NULL,
		InformationAccess int NULL,
		InstitutionalCapacty int NULL,
		EconomicDevelopment int NULL,
		HumanServices int NULL,
		CivicEngagement int NULL,
		TotalSubApplications int NULL,
		TotalSubFunded int NULL,
		TotalApplicants int NULL,
		TotalApplicantsAwarded int NULL,
		TotalSubRequested decimal(18,2) NULL,
		TotalSubAwarded decimal(18,2) NULL
	)
  
	-- Create row and fill with null values
	INSERT INTO @Totals (TotalProjects, 
						 Allotment,  
						 LSTAFundsExpended,  
						 MatchFundsExpended,  
						 LifelongLearning,  
						 InformationAccess,  
						 InstitutionalCapacty,  
						 EconomicDevelopment,  
						 HumanServices,    
						 CivicEngagement,  
						 TotalSubApplications,  
						 TotalSubFunded,  
						 TotalApplicants,
						 TotalApplicantsAwarded,  
						 TotalSubRequested,  
						 TotalSubAwarded)
	VALUES (0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
 	
	--Find the all the projects' parents
	DECLARE @ProjectId bigint
	DECLARE @ProjectVersion int
	DECLARE @num int
	DECLARE @VersionParentId int
	DECLARE @MyCursor CURSOR
	SET @MyCursor = CURSOR FAST_FORWARD
	FOR
		SELECT DISTINCT VersionParentId
		FROM Projects p
		WHERE p.FiscalYearId = @fyId
			AND p.StateId = @StateId
			AND p.Active = '1'

	OPEN @MyCursor
	FETCH NEXT FROM @MyCursor INTO @VersionParentId
	WHILE @@FETCH_STATUS = 0
	BEGIN
		SET @num = 0

		--Find the highest version of the Project
		SELECT @num = COUNT(ProjectId)
		FROM Projects p
		WHERE p.StateId = @StateId
			AND p.FiscalYearId = @fyId
			AND p.VersionParentId = @VersionParentId

		SET @ProjectId = (SELECT ProjectId 
			FROM [Projects] p
			INNER JOIN lst.ProjectStatuses ps
				ON p.ProjectStatusId = ps.ProjectStatusId
			WHERE p.StateId = @StateId
				AND p.Active = '1'
				AND p.FiscalYearId = @fyId
				AND p.ProjectVersionId = @num
				AND p.VersionParentId = @VersionParentId
				AND ps.ProjectStatusName = 'Accepted')
			
		-- TotalProjects
		UPDATE @Totals
		SET TotalProjects = TotalProjects + (
			SELECT ISNULL(COUNT(p.ProjectId), 0) as Count
			FROM [Projects] p
			WHERE p.ProjectId = @ProjectId
		)

		-- LSTAFundsExpended
		UPDATE @Totals
		SET LSTAFundsExpended = LSTAFundsExpended + (
			SELECT ISNULL(SUM(LSTA), 0.00) as LSTA
			FROM ProjectBudgets pb
			WHERE pb.ProjectId = @ProjectId
		)

		-- Focal Area Counts
		DECLARE @IntentId int
		DECLARE @IntentCursor CURSOR
		SET @IntentCursor = CURSOR FAST_FORWARD
		FOR
			SELECT IntentId
			FROM ProjectIntents p
			WHERE p.ProjectId = @ProjectId

		OPEN @IntentCursor
		FETCH NEXT FROM @IntentCursor INTO @IntentId
		WHILE @@FETCH_STATUS = 0
		BEGIN
			IF @IntentId = 1 OR @IntentId < 4 BEGIN UPDATE @Totals SET InstitutionalCapacty += 1 END
			IF @IntentId = 4 OR @IntentId < 6 BEGIN UPDATE @Totals SET InformationAccess += 1 END
			IF @IntentId = 6 OR @IntentId < 8 BEGIN UPDATE @Totals SET LifelongLearning += 1 END
			IF @IntentId = 8 OR @IntentId < 11 BEGIN UPDATE @Totals SET HumanServices += 1 END
			IF @IntentId = 11 OR @IntentId < 13 BEGIN UPDATE @Totals SET EconomicDevelopment += 1 END
			IF @IntentId = 13 OR @IntentId = 14 BEGIN UPDATE @Totals SET CivicEngagement += 1 END

			FETCH NEXT FROM @IntentCursor INTO @IntentId
		END
		CLOSE @IntentCursor
		DEALLOCATE @IntentCursor

		FETCH NEXT FROM @MyCursor INTO @VersionParentId
	END
	CLOSE @MyCursor
	DEALLOCATE @MyCursor
  
	-- LSTAAllotment from FSR
	DECLARE @fsrv int

	SELECT @fsrv = COUNT(FSRid)
	FROM FSR f
	WHERE f.StateId = @StateId
		AND f.FiscalYearId = @fyId

	UPDATE @Totals
	SET Allotment = (
		SELECT ISNULL(TotalFederalFunds, 0.00) as Allotment
		FROM FSR fsr
		WHERE fsr.StateId = @StateId
			AND fsr.FiscalYearId = @fyId
			AND fsr.Version = @fsrv
	)

	-- # Admin Projects
	DECLARE @ver int

	SELECT @ver = COUNT(AdminProjectId)
	FROM AdminProject
	WHERE StateId = @StateId
		AND FiscalYearId = @fyId

	UPDATE @Totals
	SET LSTAFundsExpended = LSTAFundsExpended + (
		SELECT ISNULL(SUM(pb.AdminBudgetLSTA),0.00) as AdminBudgetLSTA
		FROM AdminProjectBudgets pb
		INNER JOIN  AdminProject p
			ON pb.AdminProjectId = p.AdminProjectId
		WHERE p.StateId = @StateId
			AND p.FiscalYearId = @fyId
			AND p.AdminProjectVersionId = @ver
	)
	
	-- # FSR
	SET @ver = 1

	SELECT @ver = COUNT(FSRid)
	FROM FSR
	WHERE StateId = @StateId
		AND FiscalYearId = @fyId

	-- # This is for getting Match funds from alternative stored procedure
	DECLARE @tempMatch TABLE
	(
		StateFundsExpended decimal(18,2) NULL,
		OtherFundsExpended decimal(18,2) NULL
	)
	INSERT INTO @tempMatch
	EXEC sp_GetFSRMatch @StateId, @fyId
	UPDATE @Totals
	SET MatchFundsExpended += (SELECT SUM(StateFundsExpended + OtherFundsExpended)
		FROM @tempMatch)

	-- # This will gather all the FY Info data
	DECLARE @tempFY TABLE
	(
		State nchar(2) NULL,
		FiscalYear nchar(4) NULL,
		NumLibsSubmitting int NULL,
		NumApps int NULL,
		NumRcvngGrants int NULL,
		NumGrantsFunded int NULL,
		AmtRequest decimal(18,2) NULL,
		AmtAwarded decimal(18,2) NULL
	)
	INSERT INTO @tempFY
	EXEC sp_GetFYInfo @StateId, @fyId
	UPDATE @Totals
	SET TotalSubApplications = (SELECT NumLibsSubmitting FROM @tempFY),
		TotalSubFunded = (SELECT NumApps FROM @tempFY),
		TotalApplicants = (SELECT NumRcvngGrants FROM @tempFY),
		TotalApplicantsAwarded = (SELECT NumGrantsFunded FROM @tempFY),
		TotalSubRequested = (SELECT AmtRequest FROM @tempFY),
		TotalSubAwarded = (SELECT AmtAwarded FROM @tempFY)

	-- Return row
	SELECT ISNULL(TotalProjects,0) as TotalProjects
		,ISNULL(Allotment,0) as Allotment
		,ISNULL(LSTAFundsExpended,0) as LSTAFundsExpended
		,ISNULL(MatchFundsExpended,0) as MatchFundsExpended
		,ISNULL(LifelongLearning,0) as LifelongLearning
		,ISNULL(InformationAccess,0) as InformationAccess
		,ISNULL(InstitutionalCapacty,0) as InstitutionalCapacty
		,ISNULL(EconomicDevelopment,0) as EconomicDevelopment
		,ISNULL(HumanServices,0) as HumanServices
		,ISNULL(CivicEngagement,0) as CivicEngagement
		,ISNULL(TotalSubApplications,0) as TotalSubApplications
		,ISNULL(TotalSubFunded,0) as TotalSubFunded
		,ISNULL(TotalApplicants,0) as TotalApplicants
		,ISNULL(TotalApplicantsAwarded,0) as TotalApplicantsAwarded
		,ISNULL(TotalSubRequested,0) as TotalSubRequested
		,ISNULL(TotalSubAwarded,0) as TotalSubAwarded
	FROM @Totals

END
