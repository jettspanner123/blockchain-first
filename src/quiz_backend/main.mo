import Debug "mo:base/Debug";
import List "mo:base/List";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor UserDatabase {
  public type UserData = {
    userId: Text;
    earnPoints: Nat;
  };
  stable var userd : List.List<UserData> = List.nil<UserData>();

  public func saveUser(userDataText: Text, earnPointsNat: Nat) {
  let newUser : UserData = {
    userId = userDataText;
    earnPoints = earnPointsNat;
  };

  userd := List.push(newUser, userd);
  Debug.print(debug_show(userd));
};

  public query func read(): async [UserData] {
    return List.toArray(userd);
  };
 
}