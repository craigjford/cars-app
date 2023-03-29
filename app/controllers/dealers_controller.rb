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

    # def myindex
    #     current_user = User.find(1)
    #     byebug
    #     # dealers = Dealer.joins("INNER JOIN cars ON cars.dealer_id = dealers.id AND books.user_id = current_user.id")
    #     dealers = Dealer.joins("INNER JOIN cars ON cars.dealer_id = dealers.id AND cars.user_id = 1"), include: :cars
    #     render json: dealers, status: :ok
    # end

    # def myindex
    #     sql = "SELECT * FROM dealers, cars where dealers.id = cars.dealer_id and cars.user_id = 1"
    #     records_array = ActiveRecord::Base.connection.execute(sql)
    #     byebug
    # end

    def myindex
        # current_user = User.find(1)
        dealers = current_user.dealers.order(:name)
        render json: dealers, each_serializer: DealerCarSerializer,status: :ok
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
