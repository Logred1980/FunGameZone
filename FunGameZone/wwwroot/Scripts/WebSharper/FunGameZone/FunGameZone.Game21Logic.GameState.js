export function New(Deck, RoundOver, CurrentPlayerToken, PlayerOrder, PassedPlayers, Winner){
  return{
    Deck:Deck, 
    RoundOver:RoundOver, 
    CurrentPlayerToken:CurrentPlayerToken, 
    PlayerOrder:PlayerOrder, 
    PassedPlayers:PassedPlayers, 
    Winner:Winner
  };
}
