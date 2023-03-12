class RepairsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def create  
        repair = Repair.create!(repair_params)
        render json: repair, status: :created
    end

    def destroy 
        repair = find_repair
        repair.destroy
        head :no_content
    end

    def update 
        repair = find_repair
        repair.update!(repair_params)
        render json: repair, status: :accepted
    end

    private

    def find_repair
        Repair.find(params[:id])
    end

    def repair_params              
        params.permit(:car_id, :shop_name, :cost, :service_desc)
    end

    def render_not_found(error)
        render json: { error: "#{error.model} not found" }, status: :not_found
    end

    def render_unprocessable_entity(invalid) 
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
