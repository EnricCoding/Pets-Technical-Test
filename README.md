# Fever Pets® Technical Assessment - Enric Robert

Welcome to **Fever Pets®**, a project designed to showcase the amazing world of pets. This repository is the result of a technical assessment to build a feature-rich application using **Angular**. The following document provides an overview of the project, the features implemented, and technical decisions made throughout the development process.

---

## **Project Description**

Fever Pets® is a platform that displays data about pets (dogs and cats in the current version). Users can explore pets' information, view detailed profiles, and interact with features like sorting and the "Pet of the Day." This application focuses on scalability, performance, and an engaging user experience.

---

## **Features**

### **1. Home Page**
- Displays a list of pets fetched from the API.
- Displays basic pet information such as name, kind, weight, height, and length.
- Includes sorting functionality based on:
  - Name
  - Kind
  - Weight
  - Height
  - Length
- Allows navigation to the **Detail Page** for individual pets.

### **2. Detail Page**
- Shows detailed information about a selected pet, including:
  - Full-size photo.
  - Description.
  - Health status (calculated based on weight, height, and length).
- Users can navigate back to the home page while maintaining the applied sorting.

### **3. "Pet of the Day"**
- Highlights a "Pet of the Day," randomly selected from the available pets.
- The selected pet remains consistent throughout the day, regardless of navigation.

---

## **Technical Details**

### **Backend API**
The application consumes the following endpoints:
1. **List Pets**: [GET] `https://my-json-server.typicode.com/Feverup/fever_pets_data/pets`
2. **Pet Details**: [GET] `https://my-json-server.typicode.com/Feverup/fever_pets_data/pets/<pet_id>`

### **Pet Structure**
Each pet object includes:
- `id`: Unique identifier
- `name`: Name of the pet
- `kind`: Type of pet 
- `weight`: Weight in grams
- `height`: Height in centimeters
- `length`: Length in centimeters
- `photo_url`: URL for the pet's photo
- `description`: Brief description
- `number_of_lives`: Specific to cats (1–7)

### **Health Tiers**
- **Unhealthy**: Below 2 or above 5.
- **Healthy**: Between 3 and 5.
- **Very Healthy**: Between 2 and 3.
- **Special Case**: Cats with `number_of_lives = 1` are always unhealthy.

---

## **Setup and Installation**

### **Prerequisites**
- Node.js (v20.12.2) or later.
- Angular CLI (v19.0.6) or later.

### **Key Dependencies**

The project uses the following libraries and tools:
- **Angular** (v19.0.0): Framework for building the app.
- **Angular Material** (v19.0.4): UI components for modern design.
- **ngx-translate** (v16.0.4): Library for internationalization (i18n).
- **RxJS** (v7.8.0): Reactive programming library for asynchronous operations.

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/EnricCoding/Pets-Technical-Test.git
   cd pets-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to:
   ```arduino
   http://localhost:4200
   ```

---

## **Architecture**

This modular structure improves maintainability by clearly separating concerns, allowing independent development and testing of features.
It also enhances scalability by enabling easy integration of new functionalities without impacting existing modules.

### **Folder Structure**
- `/app`: Contains all core components, services, and modules.
- `/enum`: Stores TypeScript enumerations (`enum`) used throughout the application for maintaining constants and improving code readability.
- `/pages`: Includes feature-specific components like home and pet-details.
- `/shared`: Contains reusable components (e.g., reusable table) and services.
- `/models`: Defines TypeScript interfaces for entities like `Pet` and `Column`.
- `/core`: Includes critical services like API integration and state management.
- `/utils`: Houses utility functions and constants for common logic, reducing redundancy and improving code reusability

### **Notable Components**

#### **Reusable Table**
- Dynamically generates tabular data with sorting and image-handling capabilities

#### **Pet of the Day**
- Handles random pet selection and local storage for consistency.

---

## **Technical Highlights**

### **State Management**
- Implemented a dedicated `SortStateService` to handle and persist sorting and pagination states across navigation. This ensures a seamless user experience when switching between pages.

### **Performance Optimization**
- **Lazy Loading:** Components and modules are lazily loaded to reduce the initial bundle size, improving load times.
- **Reactive Programming:** Employed `RxJS` operators like `switchMap` and `catchError` to optimize asynchronous operations and handle API errors gracefully.
- **Local Storage Caching:** Utilized local storage to persist the "Pet of the Day," reducing redundant API calls and improving application responsiveness.
- **OnPush Change Detection:** Implemented the `OnPush` change detection strategy in components where inputs and observables are the primary sources of data. This reduces unnecessary change detection cycles and enhances overall performance in large-scale applications.
- **TrackBy Functions:** Added `trackBy` functions in reusable components (e.g., tables) to minimize DOM re-renders, boosting UI performance.

### **Scalability**
- **Modular Architecture:** Clearly defined folders and modules facilitate the integration of additional features and future enhancements without affecting existing code.
- **Extensible Design:** Health calculations for pets are designed to support additional attributes or rules for new pet types seamlessly.
- **Reusable Components:** Components like the `ReusableTableComponent` and utility functions in `/utils` enable consistent functionality across the application.

### **Code Quality**
- **Strong Typing:** Leveraged TypeScript features such as `enums` and interfaces (`Pet`, `SortState`, etc.) to ensure robust, maintainable, and type-safe code.
- **Utility Functions:** Consolidated common logic (e.g., health calculations, date manipulation) into `/utils` to reduce redundancy and improve testability.

## **User Experience**
- **Internationalization (i18n):** Integrated `ngx-translate` to support multiple languages, enhancing accessibility for global users.
- **Error Handling:** Provided descriptive error messages and fallback UI elements (e.g., default images, retry options) to improve usability even in edge cases.

---

## **Tests**
The project uses the following tools for testing:
- **Karma**: Test runner.
- **Jasmine**: Testing framework.
- **Karma Coverage**: Generates code coverage reports.

### **Unit Tests**
The application is equipped with comprehensive unit tests to ensure functionality and reliability. Key areas covered include:
- **Services**: Validates critical logic for services like `PetService` and `PetStorageService`, ensuring robust API integration and data handling.
- **Components**: Tests reusable components such as `ReusableTableComponent` and dynamic features in `PetDetailsComponent` to guarantee consistent behavior.
- **Error Handling**: Covers edge cases, such as invalid IDs and network errors, to confirm proper fallback mechanisms and error messaging.

Run tests with:
```bash
ng test
```

### **Coverage Reporting**
To measure and track code coverage:
1. Run the following command to execute tests and generate a coverage report:
   ```bash
   ng test --code-coverage
   ```
2. After running the command, open the `coverage` folder in your project directory and view the `index.html` file in your browser for a detailed breakdown of coverage metrics.

### **Test Statistics**
- **Total Unit Tests**: The application currently includes **46 specs**, ensuring broad coverage across all features and edge cases.
- **Test Results**: **0 failures**, indicating that all tests pass successfully.
- **Code Coverage**:
  - **Statements**: 85.32%
  - **Branches**: 74.19%
  - **Functions**: 82.02%
  - **Lines**: 85.94%
---

## **Feedback**

Any feedback or suggestions are highly appreciated!
For suggestions, contact me directly at: **enricpaginasweb@gmail.com**.

---

## **License**
Fever Pets® © 2025. All rights reserved.