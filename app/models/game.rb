class Game < ActiveRecord::Base
  has_many :playergames
  has_many :players, through: :playergames
  belongs_to :winner, class_name: "Player", foreign_key: :winner_id

  # def winner
  # 	Player.find(winner_id)
  # end

  def player1
  	players[0]
  end

  def player2
  	players[1]
  end
end
