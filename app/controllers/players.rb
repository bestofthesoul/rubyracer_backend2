get '/players/:id/profile' do
	@player = Player.find(params[:id])
	@games = @player.games
	erb :"players/profile"
end


