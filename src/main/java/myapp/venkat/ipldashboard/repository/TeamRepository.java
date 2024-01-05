package myapp.venkat.ipldashboard.repository;

import org.springframework.data.repository.CrudRepository;

import myapp.venkat.ipldashboard.model.Team;

public interface TeamRepository extends CrudRepository<Team, Long>  {

    Team findByTeamName(String teamName);
    
}
