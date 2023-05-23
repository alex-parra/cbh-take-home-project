# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

#### T1: Custom Agent IDs  
> In order to allow each facility to have custom id's for each agent, we need a pivot table `facility_agents` witht the following columns: 
>   - facility_id `// the facility unique id at facilities table`
>   - agent_id `// the agent unique id at agents table`
>   - facility_agent_id `// the custom id each facility assigns each agent`  
> 
> There should be a foreign key constraint on `facility_id` to `facilities.id`  
> There should be a foreign key constraint on `agent_id` to `agents.id`  
> There should be a `UNIQUE` constraint on `(facility_id, agent_id)` to ensure that a facility does not enter the same agent twice.  
> There should be a `UNIQUE` constraint on `(facility_id, facility_agent_id)` to ensure that a facility does not enter duplicate custom agent ids.  

#### T2. Update `getShiftsByFacility` to include the custom agent id
> Update the agent metadata to include the custom id from `facility_agents`
> Expose it in the metadata as property `facility_agent_id`

#### T3. Update `generateReport` to use `agent.facility_agent_id` instead of `agent.id`
> Update the report generation so that instead of using the `id` of the agent from the `agents` table, use the `facility_agent_id`.  
> If `facility_agent_id` is not set, fallback to `agent.id`
