class DealersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    # def myindex
        # current_user = User.find(1)
        # user = current_user      
        # dealers = current_user.dealers.distinct.order(:name)
        # dealers = Dealer.find_by_sql(["Select * from dealer inner join cars on dealer.id = cars.dealer_id where user_id = ?", user.id])
        # render json: dealers, each_serializer: DealerAllSerializer, status: :ok
    #     render json: dealers, status: :ok
    # end

    def myindex
        current_user = User.find(1)
        dealers = current_user.dealers.distinct.order(:name)
        render json: dealers, status: :ok
    end
    
    def index
        dealers = Dealer.all.order(:name)   
        render json: dealers, each_serializer: DealerAllSerializer, status: :ok
    end

    def create
        dealer = Dealer.create!(dealer_params)
        render json: dealer, status: :created
    end

    private

    def dealer_params 
        params.permit(:name, :contact, :phone, :email)
    end

    def render_not_found(error)
        render json: { error: "#{error.model} not found" }, status: :not_found
    end

    def render_unprocessable_entity(invalid) 
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
