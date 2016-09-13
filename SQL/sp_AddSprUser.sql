-- =============================================
-- Author:    Ashley Sattler
-- Create date: 4/17/2014
-- Updated on: 01/08/2015
-- Description: AddUser - creates a user account
-- EXEC sp_AddSprUser 'LSTA Coordinator','batman@holytest.com', 'hQYQD+Ui/PA=', '', 'test', 'user','555-865-7309','','addy1','addy2','addy3','city','42','37924','1'
-- =============================================
ALTER PROCEDURE [dbo].[sp_AddSprUser]
	 @UserRole nvarchar(100)
	,@Email nvarchar(255)
	,@Password nvarchar(max)
	,@Title nvarchar(100)
	,@FirstName nvarchar(100)
	,@LastName nvarchar(100)
	,@Phone nvarchar(60)
	,@Fax nvarchar(60)
	,@Address1 nvarchar(255)
	,@Address2 nvarchar(255)
	,@Address3 nvarchar(255)
	,@City nvarchar(100)
	,@StateId int
	,@Zip varchar(15)
	,@InstitutionId int = 0
AS
BEGIN
  --SET NOCOUNT ON;
  
  DECLARE @recs int
  DECLARE @UserId int

  SELECT @recs = COUNT(UserId) 
  FROM Users
  WHERE Email = @Email 

  IF @recs = 0
	BEGIN
	
	DECLARE @UserRoleId int = 3
		IF @UserRole IS NOT NULL AND @UserRole != ''
			SET @UserRoleId = (
			SELECT UserRoleId 
			FROM UserRoles
			WHERE UserRoleName = @UserRole)

		INSERT INTO [dbo].[Users] ([UserRoleId], [Active], [Email], [Password], [Title], [FirstName], [LastName], [Phone], [Fax], [Address1], [Address2], [Address3], [City], [StateId], [Zip], [InstitutionId])
		VALUES (@UserRoleId, 1, @Email, @Password, @Title, @FirstName, @LastName, @Phone, @Fax, @Address1, @Address2, @Address3, @City, @StateId, @Zip, @InstitutionId)

		SELECT @UserId = @@IDENTITY

		INSERT INTO UserStates (UserId, StateId)
		VALUES (@UserId, @StateId)

		SELECT 1
	END
  ELSE
	SELECT 0

END
