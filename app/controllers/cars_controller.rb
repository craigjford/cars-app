class CarsController < ApplicationController

    before_action :authorize

    def myindex 
        cars = current_user.cars.order(:dealer_id)
        render json: cars, status: :ok
    end

    def create  
        car = Car.create!(car_params)
        render json: car, status: :created
    end

    def destroy  
        car = find_car
        car.destroy
        head :no_content
    end

    def update  
        car = find_car
        car.update!(car_params)
        render json: car, status: :ok
    end

    private

    def find_car
        Car.find(params[:id])
    end

    def car_params              
        params.permit(:user_id, :dealer_id, :year, :make, :model)
    end

    def authorize   
        return render json: { error: "User not authorized" }, status: :unauthorized unless session.include?(:user_id)
    end

end
