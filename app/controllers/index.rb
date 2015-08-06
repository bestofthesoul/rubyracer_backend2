get '/' do
  erb :main
end


post'/games' do
  @game = Game.new
  @game.players << Player.find_or_initialize_by(name: params["player1"])
  @game.players << Player.find_or_initialize_by(name: params["player2"])
  
  if @game.save
   redirect to "/games/#{@game.id}"
  else
    redirect to '/' 
  end
end

#START GAME
get '/games/:id' do
  @game = Game.find(params[:id])
	@players = @game.players
  @player1 = @players.first
  @player2 = @players.last

	erb :game
end

patch '/games/:id' do
  @game = Game.find(params[:id])
  @game.winner_id = params[:winner]
  @game.time_taken = params[:time_taken]
  @game.save
  nil
end

get '/games/:id/stats' do
  @game = Game.find(params[:id])
  erb :stats
end

