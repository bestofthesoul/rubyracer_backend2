class CreatePlayers < ActiveRecord::Migration
	def change
	    create_table :players do |t|
	      t.string :name

	      t.timestamps null: false
	    end

	    # add_index(table_name, column_name, options = {}) public
	add_index(:players, :name, unique: :true)
	end
end
