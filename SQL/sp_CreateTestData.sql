-- =============================================
-- Author:    Ashley Sattler
-- Create date: 08/15/2016
-- Description: This script deletes all current database information and creates test data
-- EXEC sp_CreateTestData
-- =============================================

/***** WARNING *****/
/** This script will delete ALL of the SPR Project and User data,
and replace it with dummy test data. Use at your own risk. **/

ALTER PROCEDURE [dbo].[sp_CreateTestData]
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
	SET @states = (SELECT COUNT(StateId)
		FROM lst.States)

	WHILE @states > 0
	BEGIN
		-- Add 2 projects across 2 fiscal years
		DECLARE @ProjectId bigint
		EXEC @ProjectId = sp_AddProject @states, 6, 1, 'Test Project 1', 2, 0, '', 0
		EXEC sp_AddProjectIntent @ProjectId, 0, 1, 2
		EXEC sp_AddProjectActivityMetadata @ProjectId,'1','Test Activity','','1','1','1','1',''

		EXEC @ProjectId = sp_AddProject @states, 6, 1, 'Test Project 2', 2, 0, '', 0
		EXEC sp_AddProjectIntent @ProjectId, 0, 1, 2
		EXEC sp_AddProjectActivityMetadata @ProjectId,'1','Test Activity','','1','1','1','1',''

		EXEC @ProjectId = sp_AddProject @states, 7, 1, 'Test Project 1', 2, 0, '', 0
		EXEC sp_AddProjectIntent @ProjectId, 0, 1, 2
		EXEC sp_AddProjectActivityMetadata @ProjectId,'1','Test Activity','','1','1','1','1',''

		EXEC @ProjectId = sp_AddProject @states, 7, 1, 'Test Project 2', 2, 0, '', 0
		EXEC sp_AddProjectIntent @ProjectId, 0, 1, 2
		EXEC sp_AddProjectActivityMetadata @ProjectId,'1','Test Activity','','1','1','1','1',''

		-- Add SLAA users
		DECLARE @email nvarchar(255)
		SET @email = 'LSTA1-' + @states + '@test.com'
		EXEC sp_AddSprUser 'LSTA Coordinator', @email, 'hQYQD+Ui/PA=', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city',@states,'12345','1'
		SET @email = 'LSTA2-' + @states + '@test.com'
		EXEC sp_AddSprUser 'LSTA Coordinator', @email, 'hQYQD+Ui/PA=', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city',@states,'12345','1'
		SET @email = 'FM-' + @states + '@test.com'
		EXEC sp_AddSprUser 'Financial Manager', @email, 'hQYQD+Ui/PA=', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city',@states,'12345','1'
		SET @email = 'ACO-' + @states + '@test.com'
		EXEC sp_AddSprUser 'Authorized Certifying Official (ACO)', @email, 'hQYQD+Ui/PA=', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city',@states,'12345','1'

		SET @states = @states - 1
	END

	-- Add IMLS users
	EXEC sp_AddSprUser 'IMLS-Program Officer','PO1@test.com', 'hQYQD+Ui/PA=', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city','59','12345','1'
	EXEC sp_AddSprUser 'IMLS-Program Officer','PO2@test.com', 'hQYQD+Ui/PA=', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city','59','12345','1'
	EXEC sp_AddSprUser 'IMLS-Program Officer','PO3@test.com', 'hQYQD+Ui/PA=', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city','59','12345','1'
	EXEC sp_AddSprUser 'IMLS-Admin','imlsadmin@test.com', 'hQYQD+Ui/PA=', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city','59','12345','1'
	EXEC sp_AddSprUser 'IMLS-Read Only','imlsRO@test.com', 'hQYQD+Ui/PA=', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city','59','12345','1'

END