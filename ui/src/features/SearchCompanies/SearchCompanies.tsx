import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import { SERVICE_CATEGORIES_SEARCH_OPTIONS } from '../../constants/constants';
import { Category, Company, CompanyCategorySearch } from '../../types/company';
import { FC, useState } from 'react';

interface SearchCompaniesProps {
  allCompanies: Company[];
  updateFilteredCompanies: (filteredCompanies: Company[]) => void;
}

export const SearchCompanies: FC<SearchCompaniesProps> = ({
  allCompanies,
  updateFilteredCompanies,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] =
    useState<CompanyCategorySearch>({ id: Category.ALL, label: 'All' });

  const handleSearch = (
    searchText: string,
    category: CompanyCategorySearch
  ) => {
    let filteredData = allCompanies;

    if (category.id !== Category.ALL) {
      filteredData = filteredData.filter(
        (item) => item.category === category.id
      );
    }

    if (searchText) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    updateFilteredCompanies(filteredData);
  };

  return (
    <Box sx={{ maxWidth: '1100px', margin: '0' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            handleSearch(e.target.value, selectedCategory);
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory.id}
            label="Category"
            onChange={(e) => {
              const category = SERVICE_CATEGORIES_SEARCH_OPTIONS.find(
                (category) => category.id === e.target.value
              ) as CompanyCategorySearch;

              setSelectedCategory(category);
              handleSearch(searchText, category);
            }}
          >
            {SERVICE_CATEGORIES_SEARCH_OPTIONS.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
