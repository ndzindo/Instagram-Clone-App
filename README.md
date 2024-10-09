
# Instagram Clone

An Instagram clone app replicates the core features of Instagram, allowing users to create, share, and engage with visual content in a dynamic, user-friendly environment. It's a fully functional social media platform, perfect for those looking to build a personalized app for photo sharing, networking, or building communities around visual content.

## Tech Stack

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=.net&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-003B57?style=for-the-badge&logo=database&logoColor=white)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Angular
- .NET
- SQL

### Installation and Configuration

1. Clone the repository:

   ```bash
   git clone https://github.com/ndzindo/Instagram-Clone-App.git

2. Install Entity Framework Core CLI Tools:
    ```bash
    dotnet tool install --global dotnet-ef

3. Install Required EF Core NuGet Packages:
    ```bash
    dotnet add package Microsoft.EntityFrameworkCore.SqlServer
    dotnet add package Microsoft.EntityFrameworkCore.Design

4. Configure Connection String For Database

5. Create Initial Migration:
    ```bash
    dotnet ef migrations add InitialCreate

6. Apply Migration to SQL Server:
    ```bash
    dotnet ef database update

### Starting Application

    
2. Start the backend server:
    ```bash
    cd AngularApp1.Server
    dotnet run

3. Start the frontend:
    ```bash
    cd angularapp1.clint
    ng serve
