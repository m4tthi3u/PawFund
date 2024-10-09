CREATE TABLE [dbo].[Pets] (
    [Id]             INT           NOT NULL,
    [Name]           NVARCHAR (50) NOT NULL,
    [Species]        NVARCHAR (50) NOT NULL,
    [Age]            INT           NOT NULL,
    [Breed]          NVARCHAR (50) NOT NULL,
    [Description]    NVARCHAR (50) NOT NULL,
    [ImageUrl]       NVARCHAR (50) NOT NULL,
    [AdoptionStatus] NVARCHAR (20)  NOT NULL,
    [ShelterId]      INT           NOT NULL
);


ALTER TABLE [dbo].[Pets]
DROP COLUMN [Status]
