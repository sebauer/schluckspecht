Feature: Add bottle
  As a user
  I want to register new bottles added to our warehouse
  So that other people know the stock of bottles

  Scenario: Add one bottle of type x
    Given the stock of "volvic" bottles is 0
    When I add 10 "volvic" bottles to the inventory
    Then the stock of "volvic" bottles should be 10
