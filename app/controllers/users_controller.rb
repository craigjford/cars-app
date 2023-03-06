class UsersController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def show    
        if session[:user_id] == nil
            render json: { errors: "User Session does not exist" }, status: :unauthorized
        else
            user = User.find_by(id: session[:user_id])
            if user
                current_user = user
                render json: user, status: :ok
            else
                render json: { errors: "User Session does not exist" }, status: :unauthorized
            end        
        end    
    end

    def create  
        user = User.create!(user_params)
        session[:user_id] = user.id
        current_user = user
        render json: user, status: :created
    end

    private

    def user_params              
        params.permit(:username, :password, :password_confirmation, :first_name, :last_name)
    end


    def render_unprocessable_entity(invalid) 
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
