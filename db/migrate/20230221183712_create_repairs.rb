class CreateRepairs < ActiveRecord::Migration[7.0]
  def change
    create_table :repairs do |t|
      t.belongs_to :car, null: false, foreign_key: true
      t.integer :cost
      t.string :service_desc

      t.timestamps
    end
  end
end
