Feature: Add bottle
  As a user
  I want to register new bottles added to our warehouse
  So that other people know the stock of bottles

  Scenario: Add one bottle of make x and name y
    Given the stock of "volvic" "wasser still" bottles is 0
    When I add 10 "volvic" "wasser still" bottles to the inventory
    Then the stock of "volvic" "wasser still" bottles should be 10
