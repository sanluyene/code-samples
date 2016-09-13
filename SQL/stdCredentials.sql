-- =============================================
-- Author:    Ashley Sattler
-- Create date: 08/15/2016
-- Description: This script deletes all current database information and creates test data
-- EXEC sp_CreateTestData
-- =============================================

/***** WARNING *****/
/** This script will delete ALL of the SPR Project and User data,
and replace it with dummy test data. Use at your own risk. **/

CREATE PROCEDURE [dbo].[sp_CreateTestData]
AS
BEGIN
	-- Delete data
	TRUNCATE TABLE ProjectActivityBeneficiary
	TRUNCATE TABLE ProjectActivityControl
	TRUNCATE TABLE ProjectActivityMetadata
	TRUNCATE TABLE ProjectActivityOrganizationalTypes
	TRUNCATE TABLE ProjectActivityOutcomes
	TRUNCATE TABLE ProjectActivityPartnerTypes
	TRUNCATE TABLE ProjectActivityQuantities
	TRUNCATE TABLE ProjectBudgets
	TRUNCATE TABLE ProjectComments
	TRUNCATE TABLE ProjectDetails
	TRUNCATE TABLE ProjectDirectors
	TRUNCATE TABLE ProjectFiles
	TRUNCATE TABLE ProjectGrantees
	TRUNCATE TABLE ProjectIntents
	TRUNCATE TABLE ProjectOutcomes
	TRUNCATE TABLE ProjectOutcomesNew
	TRUNCATE TABLE Projects
	TRUNCATE TABLE ProjectTags
	TRUNCATE TABLE Users
	TRUNCATE TABLE UserStates

	-- Count states
	DECLARE @states int
	SET @states = (SELECT TOP 1 StateId
		FROM lst.States
		ORDER BY StateId DESC)

	WHILE @states > 0
	BEGIN
		-- Add 2 projects across 2 fiscal years
		DECLARE @ProjectId bigint
		DECLARE @DateStart6 date
		DECLARE @DateEnd6 date
		DECLARE @DateStart7 date
		DECLARE @DateEnd7 date
		DECLARE @StateGoalId int
		DECLARE @InstId int

		SET @StateGoalId = 0
		SET @StateGoalId = (SELECT TOP 1 StateGoalId FROM StateGoals WHERE StateId = @states)
		SET @InstId = 0
		SET @InstId = (SELECT TOP 1 InstitutionId FROM Institutions WHERE StateId = @states)

		SET @DateStart6 = (SELECT StartDate FROM FiscalYears WHERE FiscalYearId = 6)
		SET @DateEnd6 = (SELECT EndDate FROM FiscalYears WHERE FiscalYearId = 6)
		SET @DateStart7 = (SELECT StartDate FROM FiscalYears WHERE FiscalYearId = 7)
		SET @DateEnd7 = (SELECT EndDate FROM FiscalYears WHERE FiscalYearId = 7)

		EXEC sp_AddProject @states, 6, 1, 'Test Project 1', 2, 0, '', 0
		SET @ProjectId = (SELECT TOP 1 ProjectId FROM Projects WHERE FiscalYearId = 6 AND StateId = @states ORDER BY ProjectId DESC)
		EXEC sp_EditProjectDirector @ProjectId, 'Director Name', '867-5309', 'director@imls.gov'
		EXEC sp_EditProjectDetails @ProjectId, 'Test Project 1', 'This is the description of my test project.', '', @DateStart6, @DateEnd6, @StateGoalId, 0, 'Draft', 2
		IF @InstId > 0
			EXEC sp_EditProjectGrantee @ProjectId, @InstId
		EXEC sp_AddProjectBudget @ProjectId, 1, 10, 20, 30, 'Salaries'
		EXEC sp_AddProjectBudget @ProjectId, 2, 40, 50, 60, 'Fees'
		EXEC sp_AddProjectBudget @ProjectId, 3, 70, 80, 90, 'Going places'
		EXEC sp_AddProjectBudget @ProjectId, 4, 10, 20, 30, 'Mats'
		EXEC sp_AddProjectBudget @ProjectId, 5, 40, 50, 60, 'Equip'
		EXEC sp_AddProjectBudget @ProjectId, 6, 70, 80, 90, 'Services'
		EXEC sp_AddProjectBudget @ProjectId, 7, 10, 20, 30, 'Other'
		EXEC sp_AddProjectIntent @ProjectId, 0, 1, 2
		EXEC sp_AddProjectActivityMetadata @ProjectId,'1','Test Activity','This is the description of my test activity','1','1','1','1',''

		EXEC @ProjectId = sp_AddProject @states, 6, 1, 'Test Project 2', 2, 0, '', 0
		SET @ProjectId = (SELECT TOP 1 ProjectId FROM Projects WHERE FiscalYearId = 6 AND StateId = @states ORDER BY ProjectId DESC)
		EXEC sp_EditProjectDirector @ProjectId, 'Director Name', '867-5309', 'director@imls.gov'
		EXEC sp_EditProjectDetails @ProjectId, 'Test Project 2', 'This is the description of my test project.', '', @DateStart6, @DateEnd6, @StateGoalId, 0, 'Draft', 2
		IF @InstId > 0
			EXEC sp_EditProjectGrantee @ProjectId, @InstId
		EXEC sp_AddProjectBudget @ProjectId, 1, 10, 20, 30, 'Salaries'
		EXEC sp_AddProjectBudget @ProjectId, 2, 40, 50, 60, 'Fees'
		EXEC sp_AddProjectBudget @ProjectId, 3, 70, 80, 90, 'Going places'
		EXEC sp_AddProjectBudget @ProjectId, 4, 10, 20, 30, 'Mats'
		EXEC sp_AddProjectBudget @ProjectId, 5, 40, 50, 60, 'Equip'
		EXEC sp_AddProjectBudget @ProjectId, 6, 70, 80, 90, 'Services'
		EXEC sp_AddProjectBudget @ProjectId, 7, 10, 20, 30, 'Other'
		EXEC sp_AddProjectIntent @ProjectId, 0, 1, 2
		EXEC sp_AddProjectActivityMetadata @ProjectId,'1','Test Activity','This is the description of my test activity','1','1','1','1',''

		EXEC @ProjectId = sp_AddProject @states, 7, 1, 'Test Project 1', 2, 0, '', 0
		SET @ProjectId = (SELECT TOP 1 ProjectId FROM Projects WHERE FiscalYearId = 7 AND StateId = @states ORDER BY ProjectId DESC)
		EXEC sp_EditProjectDirector @ProjectId, 'Director Name', '867-5309', 'director@imls.gov'
		EXEC sp_EditProjectDetails @ProjectId, 'Test Project 1', 'This is the description of my test project.', '', @DateStart7, @DateEnd7, @StateGoalId, 0, 'Draft', 2
		IF @InstId > 0
			EXEC sp_EditProjectGrantee @ProjectId, @InstId
		EXEC sp_AddProjectBudget @ProjectId, 1, 10, 20, 30, 'Salaries'
		EXEC sp_AddProjectBudget @ProjectId, 2, 40, 50, 60, 'Fees'
		EXEC sp_AddProjectBudget @ProjectId, 3, 70, 80, 90, 'Going places'
		EXEC sp_AddProjectBudget @ProjectId, 4, 10, 20, 30, 'Mats'
		EXEC sp_AddProjectBudget @ProjectId, 5, 40, 50, 60, 'Equip'
		EXEC sp_AddProjectBudget @ProjectId, 6, 70, 80, 90, 'Services'
		EXEC sp_AddProjectBudget @ProjectId, 7, 10, 20, 30, 'Other'
		EXEC sp_AddProjectIntent @ProjectId, 0, 1, 2
		EXEC sp_AddProjectActivityMetadata @ProjectId,'1','Test Activity','This is the description of my test activity','1','1','1','1',''

		EXEC @ProjectId = sp_AddProject @states, 7, 1, 'Test Project 2', 2, 0, '', 0
		SET @ProjectId = (SELECT TOP 1 ProjectId FROM Projects WHERE FiscalYearId = 7 AND StateId = @states ORDER BY ProjectId DESC)
		EXEC sp_EditProjectDirector @ProjectId, 'Director Name', '867-5309', 'director@imls.gov'
		EXEC sp_EditProjectDetails @ProjectId, 'Test Project 2', 'This is the description of my test project.', '', @DateStart7, @DateEnd7, @StateGoalId, 0, 'Draft', 2
		IF @InstId > 0
			EXEC sp_EditProjectGrantee @ProjectId, @InstId
		EXEC sp_AddProjectBudget @ProjectId, 1, 10, 20, 30, 'Salaries'
		EXEC sp_AddProjectBudget @ProjectId, 2, 40, 50, 60, 'Fees'
		EXEC sp_AddProjectBudget @ProjectId, 3, 70, 80, 90, 'Going places'
		EXEC sp_AddProjectBudget @ProjectId, 4, 10, 20, 30, 'Mats'
		EXEC sp_AddProjectBudget @ProjectId, 5, 40, 50, 60, 'Equip'
		EXEC sp_AddProjectBudget @ProjectId, 6, 70, 80, 90, 'Services'
		EXEC sp_AddProjectBudget @ProjectId, 7, 10, 20, 30, 'Other'
		EXEC sp_AddProjectIntent @ProjectId, 0, 1, 2
		EXEC sp_AddProjectActivityMetadata @ProjectId,'1','Test Activity','This is the description of my test activity','1','1','1','1',''

		-- Return Admin Project and FSR if necessary
		DECLARE @status nvarchar(50)
		DECLARE @rid int

		SET @status = (SELECT TOP 1 ReportStatus FROM FSR Where FiscalYearId = 6 AND StateId = @states ORDER BY Version DESC)
		IF @status IN ('Certified', 'Approved', 'Accepted')
			BEGIN
				SET @rid = (SELECT TOP 1 FSRid FROM FSR Where FiscalYearId = 6 AND StateId = @states ORDER BY Version DESC)
				EXEC sp_ReturnFSR @rid, 2
			END

		SET @status = (SELECT TOP 1 ReportStatus FROM FSR Where FiscalYearId = 7 AND StateId = @states ORDER BY Version DESC)
		IF @status IN ('Certified', 'Approved', 'Accepted')
			BEGIN
				SET @rid = (SELECT TOP 1 FSRid FROM FSR Where FiscalYearId = 7 AND StateId = @states ORDER BY Version DESC)
				EXEC sp_ReturnFSR @rid, 2
			END

		SET @status = (SELECT TOP 1 ReportStatus FROM AdminProject Where FiscalYearId = 6 AND StateId = @states ORDER BY AdminProjectVersionId DESC)
		IF @status IN ('Certified', 'Approved', 'Accepted')
			BEGIN
				SET @rid = (SELECT TOP 1 AdminProjectId FROM AdminProject Where FiscalYearId = 6 AND StateId = @states ORDER BY AdminProjectVersionId DESC)
				EXEC sp_ReturnAdminProject @rid, 2
			END

		SET @status = (SELECT TOP 1 ReportStatus FROM AdminProject Where FiscalYearId = 7 AND StateId = @states ORDER BY AdminProjectVersionId DESC)
		IF @status IN ('Certified', 'Approved', 'Accepted')
			BEGIN
				SET @rid = (SELECT TOP 1 AdminProjectId FROM AdminProject Where FiscalYearId = 7 AND StateId = @states ORDER BY AdminProjectVersionId DESC)
				EXEC sp_ReturnAdminProject @rid, 2
			END

		-- Add SLAA users
		DECLARE @email nvarchar(255)
		SET @email = 'LSTA1-' + CAST(@states AS VARCHAR) + '@test.com'
		EXEC sp_AddSprUser 'LSTA Coordinator', @email, 'E76MKv9cY2B/EodqOF7hzw==', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city',@states,'12345','1'
		SET @email = 'LSTA2-' + CAST(@states AS VARCHAR) + '@test.com'
		EXEC sp_AddSprUser 'LSTA Coordinator', @email, 'E76MKv9cY2B/EodqOF7hzw==', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city',@states,'12345','1'
		SET @email = 'FM-' + CAST(@states AS VARCHAR) + '@test.com'
		EXEC sp_AddSprUser 'Financial Manager', @email, 'E76MKv9cY2B/EodqOF7hzw==', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city',@states,'12345','1'
		SET @email = 'ACO-' + CAST(@states AS VARCHAR) + '@test.com'
		EXEC sp_AddSprUser 'Authorized Certifying Official (ACO)', @email, 'E76MKv9cY2B/EodqOF7hzw==', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city',@states,'12345','1'

		SET @states = @states - 1
	END

	-- Add IMLS users
	EXEC sp_AddSprUser 'IMLS-Program Officer','PO1@test.com', 'E76MKv9cY2B/EodqOF7hzw==', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city','59','12345','1'
	EXEC sp_AddSprUser 'IMLS-Program Officer','PO2@test.com', 'E76MKv9cY2B/EodqOF7hzw==', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city','59','12345','1'
	EXEC sp_AddSprUser 'IMLS-Program Officer','PO3@test.com', 'E76MKv9cY2B/EodqOF7hzw==', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city','59','12345','1'
	EXEC sp_AddSprUser 'IMLS-Admin','imlsadmin@test.com', 'E76MKv9cY2B/EodqOF7hzw==', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city','59','12345','1'
	EXEC sp_AddSprUser 'IMLS-Read Only','imlsRO@test.com', 'E76MKv9cY2B/EodqOF7hzw==', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city','59','12345','1'

END