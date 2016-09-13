-- =============================================
-- Author:    Ashley Sattler
-- Create date: 12/16/2013
-- Updated on: 01/22/2016
-- Description: AddProject - Adds initial data when creating a project
-- EXEC sp_AddProject 47, 12, 1, 'Test Project', 2, 0, '', 0
-- =============================================
ALTER PROCEDURE [dbo].[sp_AddProject]
	@StateId int
	,@FiscalYearId int
	,@ProjectStatusId int
	,@ProjectTitle nvarchar(255)
	,@UserId int
	,@ParentProjectId int
	,@OldSystemCode nvarchar(50)
	,@Exemplary int

AS
BEGIN
	SET NOCOUNT ON;
  
	DECLARE @ProjectId bigint
	DECLARE @ModifyTimestamp datetime

	SET @ModifyTimestamp = GETDATE()

	INSERT INTO Projects (ProjectVersionId, StateId, FiscalYearId, ProjectStatusId, OldSystemCode, ParentProjectId, ProjectTitle, Exemplary, UserId, ModifyTimestamp) 
	VALUES (1, @StateId, @FiscalYearId, @ProjectStatusId, @OldSystemCode, @ParentProjectId, @ProjectTitle, @Exemplary, @UserId, @ModifyTimestamp)
  
	SELECT @ProjectId = @@IDENTITY

	UPDATE Projects
	SET VersionParentId = @ProjectId
	WHERE ProjectId = @ProjectId

	INSERT INTO ProjectDetails (ProjectId, ProjectDescription, StartDate, EndDate, StateGoalId, ExemplaryNarrative)
	VALUES (@ProjectId, NULL, NULL, NULL, NULL, NULL)

	INSERT INTO ProjectGrantees (ProjectId, InstitutionId)
	VALUES (@ProjectId, NULL)

	/* INSERT INTO ProjectBudgetFlags (BudgetFlagId, ProjectId, BudgetFlagValue)
	SELECT BudgetFlagId, @ProjectId, 0 FROM lst.BudgetFlags ORDER BY BudgetFlagId */

	INSERT INTO [dbo].[ProjectOutcomes] ([ProjectId], [Findings], [FindingsImportance], [LessonsLearned], [SurveyFlag], [ReviewFlag], [InterviewFlag], [ParticipantFlag], [OtherFlag], [IsSLAAProject], [ContinueFlag], [ContinueText], [EffortLevelFlag], [EffortLevelText], [ScopeChangeFlag], [ScopeChangeText], [OtherChangesFlag], [OtherChangesText])
	VALUES (@ProjectId, '', '', '', 0, 0, 0, 0, 0, 0, 0, '', 0, '', 0, '', 0, '')

	INSERT INTO [dbo].[ProjectOutcomesNew] (ProjectId, UnreportedFindings, FutureFindings, LessonsLearned, ContinueFlag, LOEChangeFlag, LOEChange, ActivityChangeFlag, ActivityChange, EvalConductedFlag, EvalWrittenFlag, EvalPublicFlag, EvalConductedByFlag, EvaluationTools0, EvaluationTools1, EvaluationTools2, EvaluationTools3, EvaluationTools4, EvaluationTools5, EvaluationTools6, EvalToolsOther, EvalMediaPhotos, EvalMediaVideos, EvalMediaAudio, EvalParticipantsFlag0, EvalParticipantsFlag1, EvalParticipantsFlag2, EvalParticipantsFlag3, EvalParticipantsFlag4, EvalParticipantsFlag5, EvalParticipantsOther, EvalAnalysisFlag0, EvalAnalysisFlag1, EvalAnalysisOther, EvalDesignFlag0, EvalDesignFlag1, EvalDesignFlag2, EvalDesignFlag3, EvalDesignFlag4, EvalDesign0, EvalDesign1, EvalDesign2, EvalDesign3, EvalDesign4)
	VALUES (@ProjectId, '', '', '', 0, 0, '', 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, '', 0, 0, 0, 0, 0, '', '', '', '', '')

	INSERT INTO ProjectDirectors (ProjectId, DirectorName, DirectorPhone, DirectorEmail)
	VALUES (@ProjectId, '', '', '')

	SELECT @ProjectId as ProjectId
END