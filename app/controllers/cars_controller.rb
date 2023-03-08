class CarsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def myindex 
        current_user = User.find(1)
        cars = current_user.cars
        render json: cars, status: :ok
        # render json: cars, [:include, :repairs], status: :ok
    end

    def create  
        car = Car.create!(car_params)
        render json: car, status: :created
    end

    private

    def car_params              
        params.permit(:user_id, :dealer_id, :year, :make, :model)
    end

    def render_unprocessable_entity(invalid) 
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
