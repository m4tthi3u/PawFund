<div align="center">

# 🐾 PawFund

### Connecting Hearts, Saving Paws

[![Licence: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/license/mit)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Node.js Version](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org)
[![.NET Version](https://img.shields.io/badge/.NET-8.0-purple)](https://dotnet.microsoft.com)

*A platform designed to support adopting and fundraising for abandoned pets.*

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Contributing](#contributing) • [License](#license)

</div>

---

## 🎯 Features

- **Pet Adoption Management** 
  - Comprehensive listings
  - Smart matching system
  - Adoption workflow tracking

- **Fundraising Campaigns** 
  - Direct support for animals in need
  - Progress tracking
  - Transparent fund allocation

- **User Experience**
  - Secure authentication
  - Personalised profiles
  - Intuitive dashboard

- **Event System**
  - Adoption day scheduling
  - Fundraising events
  - Community meetups

- **Mobile-First Design***
  - Responsive interfaces
  - Cross-platform compatibility
  - Optimised performance

<sub>* Only apply for the web, Admin Dashboard does not apply.</sub>

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **.NET 8.0** or later
- **Node.js** 20.x or later
- **npm** or **yarn** or **bun**
- **PostgreSQL**

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/m4tthi3u/PawFund.git
   cd PawFund
   ```

2. **Set up the backend**
   ```bash
   # Navigate to the backend project directory
   cd PawFund
   
   # Restore dependencies
   dotnet restore
   
   # Update database with migrations
   dotnet ef database update
   ```

3. **Set up the frontend**
   ```bash
   # Navigate to the ClientApp directory
   cd PawFund.Presentation/ClientApp
   
   # Install dependencies
   npm install
   # or
   yarn install
   # or
   bun install (prefered because bun is fast)
   ```

4. **Run the application**
   ```bash
   # Run the backend
   dotnet run --launch-profile "http" // or "https"
   
   # In a separate terminal, run the frontend
   cd PawFund.Presentation/ClientApp
   npm run start
   # or
   yarn start
   # or
   bun run start
   ```

   📍 Access the application at:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:7112`

## 📁 Project Structure

```
PawFund/
├── PawFund.Data/           # Data Access Layer
│   ├── Models/             # Database models
│   ├── Repositories/       # Data access patterns
│   └── Context/            # Database context
│
├── PawFund.Business/      # Business Logic Layer
│   ├── Services/          # Business logic
│   └── DTOs/               # Data Transfer Object(s)
│
└── PawFund.Presentation/   # Presentation Layer
    ├── Controllers/       # API endpoints
    └── ClientApp/         # React Application
```

## 🔧 Development Environment

### Code Editors & IDEs
- **Frontend Development**
  - **Visual Studio Code** - Primary code editor for React/JavaScript
  - **Zed** - Modern, high-performance alternative editor

- **Backend Development**
  - **JetBrains Rider** - Powerful .NET IDE with advanced debugging capabilities

- **Database Management**
  - **JetBrains DataGrip** - Comprehensive database management and query tools

### Frontend Features
- **React Router** for seamless navigation
- **SCSS** for maintainable styling
- **React Icons** for consistent UI elements
- **React Multi Carousel** for image galleries
- **React Tabs** for organised content

### Backend Architecture
- **Entity Framework Core** for reliable data access
- **Repository pattern** for clean data abstraction
- **RESTful API** design for efficient communication


## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📄 License

This project is licenced under the **MIT Licence** - see the [LICENCE](https://github.com/m4tthi3u/PawFund?tab=MIT-1-ov-file) file for details.

## 📬 Contact

Lâm Nguyễn - [@m4tthi3u](https://github.com/m4tthi3u)

Project Link: https://github.com/m4tthi3u/PawFund

---

<div align="center">

Made with ❤️ for pets in need

</div>
