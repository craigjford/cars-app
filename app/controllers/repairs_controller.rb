class RepairsController < ApplicationController

    before_action :authorize

    def index 
        repairs = current_user.repairs.order(:car_id)
        render json: repairs, each_serializer: RepairAllSerializer, status: :ok
    end

    def show
        repair = Repair.find(params[:id])
        render json: repair, serializer: RepairAllSerializer, status: :ok
    end

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
        byebug
        repair.update!(repair_params)
        render json: repair, status: :accepted
    end

    private

    def find_repair
        Repair.find(params[:id])
    end
    
    def repair_params              
        params.permit(:id, :car_id, :shop_name, :cost, :service_desc)
    end

    def authorize   
        return render json: { error: "User not authorized" }, status: :unauthorized unless session.include?(:user_id)
    end

end
