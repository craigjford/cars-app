class CreateDealers < ActiveRecord::Migration[7.0]
  def change
    create_table :dealers do |t|
      t.string :name
      t.string :contact
      t.integer :phone
      t.string :email

      t.timestamps
    end
  end
end
