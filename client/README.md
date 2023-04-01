
# README

# The Car Repository Application

[Cars App] (https://cars-app-xrq7.onrender.com)

## Overview

The application is a car repository for users. The application has user authentication so a user is required to Signup with a User supplied userid and password.  The user is required to log in to the site to create any activity. A user can keep track of all the cars they have purchased, dealers from whom they have purchased cars and all repairs they performed on their cars.  A user is only able to manage cars/dealers/repairs associated with their account.  

## Technologies Used
The front end is written in React and is a single page application.  It utilizes React and React-Dom version 18.2.0.  It utilizes React-Router-Dom version 6.8.1. The application is written utilizing Redux, React-Redux verion 8.0.5.  Application utilizes Redux toolkit version 1.9.3 as well as Redux Devtools version 2.13.9   React interfaces with Ruby (v2.7.4) on Rails (v7.0.4) with Active Record in communicating with the backend's database for CRUD operations and Validations.  The database is a Postgres database (v1.1). The project utilizes BCrypt (v.3.1.7) for password encryption and password recovery.  Ruby on Rails is configured as being an API so it sends formatted JSON to the front end.

## Application Ports
Each application will run on its own port on `localhost`:

- React: [http://localhost:4000](http://localhost:4000)
- Rails: [http://localhost:3000](http://localhost:3000)

## Project Diagram (/client/src/cars.drawio.png)

## React Components

```console
index.js 
    |_ App
       |_ NavBar
          | (logged out)
          |_ Home
          |_ LogIn
          |_ UserSignUpForm
          |_ (logged in)    
          |_ Home
          |_ Cars
               |_ Car
                    |_ CarDetails
                        |_ RepairShow
                        |_ RepairUpdate
                        |_ RepairInput
                    |_ CarUpdate 
                |_ CarInput    
                |_ carsSlice             
          |_ Repairs   
               |_ Repair
                    |_ RepairUpdate  
                |_ RepairForm   
                |_ repairsSlice 
          |_ MyDealers
                |_ MyDealer
                |_ mydealersSlice
          |_ Dealers
                |_ Dealer
                |_ DealerInput  
                |_ dealersSlice   
       
```

## React Component Functions

index.js - Renders the App component.  APP is wrapped by BrowserRouter which enables navigation through the application in the App and NavBar components.  It is also wrapped by Provider with a store parameter which enables Redux.  Redux enables Global State which is utilized throughtout the application using Redux.

Redux Store(/client/src/store.js) - Redux allows data to be accessed globally.  As changes are made to the database, global data in Redux will be kept in sync to allow users to access data without the need to make numerous time-consumers database calls.  The stores the following reducers

```console

import { configureStore } from "@reduxjs/toolkit";

import dealersReducer from "./features/dealers/dealersSlice";
import mydealersReducer from "./features/mydealers/mydealersSlice";
import userReducer from "./features/user/userSlice";
import carsReducer from "./features/cars/carsSlice";
import repairsReducer from "./features/repairs/repairsSlice";

const store = configureStore({
  reducer: {
    dealers: dealersReducer,
    mydealers: mydealersReducer,
    user: userReducer,
    cars: carsReducer,
    repairs: repairsReducer
  },
});

export default store;

```

dealersReducer.js - Maintains all the dealers in the database available to all users

mydealersReducer.js - Maintains a nested array of all the dealers and the associated cars that the user has purchased

usersReducer.js - Contains information related to the logged in user.  User also maintains a flag which the application can acce ss to see if someone is logged in.

carsReducer.js - Maintains a nested array of all the cars that the user has purchased as well as associated dealer and associated repairs.

repairsReducer.js - Maintains a nested array of all the user's repairs and its associated car.

ALL reducers have a fetch status field which allows application to access status of of fetch.  The Status field can be either "loading" or "idle".  All reducers also have a reset reducer to initialize all fetches to empty as user is logging off.

App - is the top-level component of the application.  It is called from index.js.  App renders the NavBar component as well as routes which are accessible based on if a user is logged in.  If there is no one logged in, the Home, LogIn and UserSignupForm routes are available.  If a user is logged in, the Home, Dealers, MyDealers, Cars, CarDetails, CarUpdate, RepairUpdate, Repairs and RepairShow routes are available.


## App Routes With No User Logged In

```console

          <Routes> 
            <Route exact="true" path="/" element={<Home isHome={isTrue} />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<UserSignUpForm />} />
            <Route path="*" element={<Home path="*" isHome={!isTrue} />} />
          </Routes>  

```
 
## App Routes With No User Logged In

```console

          <Routes>
            <Route exact="true" path="/" element={<Home isHome={isTrue} />} />
            <Route path="/mydealers" element={<MyDealers />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/mycars" element={<Cars />} />  
            <Route path="/cars/:car_id" element={<CarDetails /> } />
            <Route path="/cars/:car_id/edits" element={<CarUpdate /> } />
            <Route path="/cars/:car_id/repairs/:repair_id/edit" element={<RepairUpdate />} /> 
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/repairs/:repair_id/show" element={<RepairShow />} /> 
            <Route path="*" element={<Home patch="*" isHome={!isTrue}/>} />
          </Routes>

```

NavBar - is called from App and is displayed on each page.  The navigation bar will have options depending if a user is logged in as discussed in App description.  If a user is logged in, NavBar has a Logout link.  Upon clicking the Logout link, this component performs Logout functionality.

Home - if a user is logged in, component renders information related to logged in user.  Otherwise, Home renders a message to log in or sign up.  Home also gives a description of the purpose of the application.

Login - enables a user to log into application.  There are username and password fields to enter data.  Data entered is validated with the backend to validate if information entered is correct.  If data entered is correct, a session cookie is created with user's id and user is navigated to the Home component, otherwise an error message is provided to user and allowing user to try again.

UserSignUpForm - this component is available to new users.  Users will be asked for profile information as well as a username, password and password confirmation. Upon submittng, process is sent the backend where validations are done (as you can review in User model below).  If username is unique and passwords match, and the rest of the inputted data passes validations, a User instance is written to User table and a Session id is created.

Dealers - lists all of the dealers in the database that have been added by all users.  Each dealer is displayed by Dealer component.  Contains an Add Dealer button that when clicked, displays the DealerInput component, where you can add a new dealer.

Cars - list all of the logged in user's cars through Car component.  Contains an Add Car button that when clicked, displays the CarInput component, where you can add a new car.

Car component - displays information about individual car.  Allows user to navigate to CarDetails page or CarUpdate.  Component also offers a Delete Car button which when clicked deletes car.

CarDetails - displays car details, associated dealer information and lists a Repair component for each of car's repair.  Also has a Add Repair button that when clicked, displays RepairInput component where user can add a repair.

Repair - displays Repair information within CarDetails. Component has links to RepairShow and RepairUpdate components.  It also provides a Delete button where the delete functionality is performed within the component.

Repairs - lists all of user's repairs through RepairItem component.  Also contains a Add Repair button which when clicked, displays RepairForm where user can add a repair.

MyDealers - lists all of individual dealers, and associated cars, that the user has done business.

## Database Diagram

```console

    Users -<  Cars  >- Dealers
                |
                ^    
             Repairs

```

## Database Schema

```console

ActiveRecord::Schema[7.0].define(version: 2023_03_10_012849) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cars", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "dealer_id", null: false
    t.integer "year"
    t.string "make"
    t.string "model"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dealer_id"], name: "index_cars_on_dealer_id"
    t.index ["user_id"], name: "index_cars_on_user_id"
  end

  create_table "dealers", force: :cascade do |t|
    t.string "name"
    t.string "contact"
    t.string "phone"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "repairs", force: :cascade do |t|
    t.bigint "car_id", null: false
    t.integer "cost"
    t.string "service_desc"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "shop_name"
    t.index ["car_id"], name: "index_repairs_on_car_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "cars", "dealers"
  add_foreign_key "cars", "users"
  add_foreign_key "repairs", "cars"
end

```


## Active Record Models

```console

class User < ApplicationRecord
    has_secure_password

    has_many :cars
    has_many :dealers, -> { distinct }, through: :cars
    has_many :repairs, through: :cars   
     
    validates :username, :password, :first_name, :last_name, presence: true
    validates :username, uniqueness: true
    
end

class Car < ApplicationRecord
  belongs_to :user
  belongs_to :dealer

  has_many :repairs, dependent: :destroy

  validates :year, :make, :model, presence: true
  validates :year, numericality: { only_integer: true}
  validates :year, numericality: { greater_than: 1930 }
  validates :year, numericality: { less_than: 2024 }

end

class Dealer < ApplicationRecord
    has_many :cars
    has_many :users, through: :cars

    validates :name, :contact, :phone, :email, presence: true
    validates :phone, length: { is: 10 }
    validates :phone, numericality: { only_integer: true}

end

class Repair < ApplicationRecord
  belongs_to :car

  validates :service_desc, :shop_name, presence: true

  validate :cost_checks

  def cost_checks

    if cost.nil?
      errors.add(:cost, "is required")
    elsif cost <= 0
      errors.add(:cost, "must be greater than zero")  
    elsif !cost.integer?
      errors.add(:cost, "must be an integer")
    end
  end  

end

```


## Rails Routes

```console

Rails.application.routes.draw do

    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    get "/mycars", to: "cars#myindex"
    get "/mydealers", to: "dealers#myindex"

    resources :repairs, only: [:index, :show, :create, :destroy, :update]
    resources :cars, only: [:index, :show, :create, :destroy, :update]
    resources :dealers, only: [:index, :create]

    # this route is used to retrieve dealers with associated transactions to the logged in user  

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end

```