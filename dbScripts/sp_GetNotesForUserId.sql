
Create PROCEDURE [dbo].[GetNotesForUserId]
	@UserId int = 0
AS
	SELECT * from Notes N1 Where N1.UserId = @UserId
	Union
	Select N2.* from Notes N2
	Inner Join NotesCollabe NC on NC.Note_id = N2.Id
	Where NC.UserId = @UserId
