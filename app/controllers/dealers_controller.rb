class DealersController < ApplicationController

    before_action :authorize

    def myindex
        # current_user = User.find(5)
        dealers = current_user.dealers.order(:name)
        render json: dealers, each_serializer: DealerCarSerializer,status: :ok
    end
    
    def index
        dealers = Dealer.all.order(:name)  
        render json: dealers, status: :ok
    end

    def create
        dealer = Dealer.create!(dealer_params)
        render json: dealer, status: :created
    end

    private

    def dealer_params 
        params.permit(:name, :contact, :phone, :email)
    end

    def authorize   
        return render json: { error: "User not authorized" }, status: :unauthorized unless session.include?(:user_id)
    end

end
