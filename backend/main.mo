import Hash "mo:base/Hash";

import Text "mo:base/Text";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Result "mo:base/Result";

actor {
  // TaxPayer record type
  type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: ?Text;
  };

  // Stable variable to store TaxPayer records
  stable var taxPayersEntries : [(Text, TaxPayer)] = [];

  // HashMap to store TaxPayer records
  var taxPayers = HashMap.HashMap<Text, TaxPayer>(0, Text.equal, Text.hash);

  // Initialize the HashMap with stable data
  taxPayers := HashMap.fromIter<Text, TaxPayer>(taxPayersEntries.vals(), 0, Text.equal, Text.hash);

  // Create a new TaxPayer record
  public func createTaxPayer(tid: Text, firstName: Text, lastName: Text, address: ?Text) : async Result.Result<(), Text> {
    if (taxPayers.get(tid) != null) {
      return #err("TaxPayer with TID " # tid # " already exists");
    };
    let newTaxPayer : TaxPayer = {
      tid = tid;
      firstName = firstName;
      lastName = lastName;
      address = address;
    };
    taxPayers.put(tid, newTaxPayer);
    #ok(())
  };

  // Get all TaxPayer records
  public query func getTaxPayers() : async [TaxPayer] {
    Iter.toArray(taxPayers.vals())
  };

  // Search for a TaxPayer by TID
  public query func searchTaxPayer(tid: Text) : async ?TaxPayer {
    taxPayers.get(tid)
  };

  // Pre-upgrade hook to save the state
  system func preupgrade() {
    taxPayersEntries := Iter.toArray(taxPayers.entries());
  };

  // Post-upgrade hook to restore the state
  system func postupgrade() {
    taxPayers := HashMap.fromIter<Text, TaxPayer>(taxPayersEntries.vals(), 0, Text.equal, Text.hash);
  };
}
