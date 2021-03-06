USE [master]
GO
CREATE DATABASE [MirQ57]
GO

Use [MirQ57]
GO
CREATE TABLE [dbo].[Events](
	[EventID] [int] IDENTITY(1,1) NOT NULL,
	[EventDescription] [varchar](max) NOT NULL,
	[EventLocation] [varchar](max) NOT NULL,
	[EventStart] [datetime] NOT NULL,
	[EventEnd] [datetime] NULL,
	[IsAllDay] [bit] NOT NULL,
	[fk_UserEventHost] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Events] PRIMARY KEY CLUSTERED 
(
	[EventID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[User_Participates_Event](
	[ParticipationID] [int] IDENTITY(1,1) NOT NULL,
	[fk_EventID] [int] NOT NULL,
	[fk_UserID] [uniqueidentifier] NOT NULL,
	[Participates] [bit] NOT NULL,
 CONSTRAINT [PK_User_Participates_Event] PRIMARY KEY CLUSTERED 
(
	[ParticipationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Users](
	[UserID] [uniqueidentifier] NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Password] [varchar](256) NOT NULL,
	[Prename] [varchar](50) NOT NULL,
	[Surname] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Events]  WITH CHECK ADD  CONSTRAINT [FK_Events_Users] FOREIGN KEY([fk_UserEventHost])
REFERENCES [dbo].[Users] ([UserID])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Events] CHECK CONSTRAINT [FK_Events_Users]
GO
ALTER TABLE [dbo].[User_Participates_Event]  WITH CHECK ADD  CONSTRAINT [FK_User_Participates_Event_Events] FOREIGN KEY([fk_EventID])
REFERENCES [dbo].[Events] ([EventID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[User_Participates_Event] CHECK CONSTRAINT [FK_User_Participates_Event_Events]
GO
ALTER TABLE [dbo].[User_Participates_Event]  WITH CHECK ADD  CONSTRAINT [FK_User_Participates_Event_Users] FOREIGN KEY([fk_UserID])
REFERENCES [dbo].[Users] ([UserID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[User_Participates_Event] CHECK CONSTRAINT [FK_User_Participates_Event_Users]
GO
USE [master]
GO
ALTER DATABASE [MirQ57] SET  READ_WRITE 
GO
