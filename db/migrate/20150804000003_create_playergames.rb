class CreatePlayergames < ActiveRecord::Migration
	def change
	    create_table :playergames do |t|
	      t.integer :player_id
	      t.integer :game_id
	      t.timestamps null: false
	    end
	end
end
