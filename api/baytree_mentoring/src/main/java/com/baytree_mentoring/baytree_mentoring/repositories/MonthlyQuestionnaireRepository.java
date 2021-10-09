package com.baytree_mentoring.baytree_mentoring.repositories;

import com.baytree_mentoring.baytree_mentoring.models.MonthlyQuestionnaireForm;
import com.baytree_mentoring.baytree_mentoring.models.MonthlyQuestionnaireId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthlyQuestionnaireRepository extends JpaRepository<MonthlyQuestionnaireForm, MonthlyQuestionnaireId> {
}

