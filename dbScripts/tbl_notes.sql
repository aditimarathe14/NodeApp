CREATE TABLE [dbo].[Notes] (
    [Id]           INT             IDENTITY (1, 1) NOT NULL,
    [CompanyId]    INT             NULL,
    [UserId]       INT             NULL,
    [Title]        NVARCHAR (1000) NULL,
    [Body]         NVARCHAR (MAX)  NULL,
    [createdOn]    DATETIME        NULL,
    [lastUpdateOn] DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);
