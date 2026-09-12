# language: en
Feature: DeepSeek Exporter exports
  As a DeepSeek user
  I want the exporter to produce safe export files
  So that injected conversation content cannot execute code or leak private state

  Scenario: Markdown export neutralizes executable URLs
    Given a DeepSeek conversation containing unsafe URLs
    When I export the conversation as "Markdown"
    Then the Markdown export has no executable URLs
    And the Markdown export keeps safe URLs

  Scenario: HTML export keeps Subresource Integrity attributes
    Given a DeepSeek conversation containing unsafe URLs
    When I export the conversation as "HTML"
    Then the HTML export keeps 5 Subresource Integrity attributes
    And the HTML export has no executable links

  Scenario: The export menu closes after an export
    Given a DeepSeek conversation containing unsafe URLs
    When I export the conversation as "Markdown"
    Then the export menu is closed
