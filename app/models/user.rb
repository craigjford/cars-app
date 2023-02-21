class User < ApplicationRecord
    has_many :cars
    has_many :dealers, through: :cars
    has_many :repairs, through: :cars    
end
