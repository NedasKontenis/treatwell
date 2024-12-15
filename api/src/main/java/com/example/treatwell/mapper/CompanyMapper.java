package com.example.treatwell.mapper;

import com.example.treatwell.model.Company;
import com.example.treatwell.model.WorkingHours;
import com.example.treatwell.model.dto.CompanyDTO;
import com.example.treatwell.model.dto.WorkingHoursDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CompanyMapper {
    CompanyDTO toDTO(Company company);
    WorkingHoursDTO toWorkingHoursDTO(WorkingHours workingHours);
    WorkingHours toWorkingHours(WorkingHoursDTO workingHoursDTO);
}