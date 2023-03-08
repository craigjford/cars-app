class RepairsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def create  
        repair = Repair.create!(repair_params)
        render json: repair, status: :created
    end

    private

    def repair_params              
        params.permit(:car_id, :cost, :service_desc)
    end

    def render_unprocessable_entity(invalid) 
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
