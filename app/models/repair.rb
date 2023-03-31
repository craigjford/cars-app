class Repair < ApplicationRecord
  belongs_to :car

  validates :service_desc, :shop_name, presence: true

  validate :cost_checks

  def cost_checks

    if cost.nil?
      errors.add(:cost, "is required")
    elsif cost <= 0
      errors.add(:cost, "must be greater than zero")  
    elsif !cost.integer?
      errors.add(:cost, "must be an integer")
    end
  end  

end
