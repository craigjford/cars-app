class CarsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def myindex 
        byebug
        # user = User.find(params[:id])
        # current_user = User.find(1)
        # cars = current_user.cars
        dealers = current_user.dealers
        render json: dealers, status: :ok
    end

    def create  
        car = Car.create!(car_params)
        render json: car, status: :createdUser
    end

    private

    def car_params              
        params.permit(:user_id, :dealer_id, :year, :make, :model)
    end

    def render_unprocessable_entity(invalid) 
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
