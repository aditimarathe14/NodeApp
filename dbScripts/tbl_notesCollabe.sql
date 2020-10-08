CREATE TABLE [dbo].[NotesCollabe] (
    [Id]         INT       IDENTITY (1, 1) NOT NULL,
    [Note_id]    INT       NOT NULL,
    [UserId]     INT       NOT NULL,
    [Permission] NCHAR (1) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);
