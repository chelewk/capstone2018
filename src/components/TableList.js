import React from 'react';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
import AddDialouge from './AddDialouge';
import {
  SelectionState,
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  EditingState,
  IntegratedSelection,
} from '@devexpress/dx-react-grid';

import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  TableSelection,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';


class TableList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'number', title: 'Number' },
        { name: 'instructor', title: 'Instructor' },
        { name: 'year', title: 'Year' },
        { name: 'semester', title: 'Semester' }
      ],
      currentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15],
      selection: [],
      
    };
    const { classes } = props;
    this.changeFilters = filters => this.setState({ filters });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
    this.changeSelection = selection => this.setState({ selection });
  }
  render() {
    const {  columns } = this.state;
    
    return (
      <Paper>
        <Grid
          rows={this.props.courses}
          columns={columns}
        >

          <SortingState
            defaultSorting={[{ columnName: 'city', direction: 'asc' }]}
          />
          <IntegratedSorting />
          <PagingState
            currentPage={this.currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={this.pageSize}
            onPageSizeChange={this.changePageSize}
          />
          <SelectionState
              selection={this.selection}
              onSelectionChange={this.changeSelection}
            />
          <IntegratedPaging />
          <IntegratedSelection />
          <FilteringState
            filters={this.filters}
            onFiltersChange={this.changeFilters}
          />
          <IntegratedFiltering />
          <Table />
          <TableHeaderRow showSortingControls />
          <TableSelection showSelectAll />
          <TableFilterRow />
          <PagingPanel
            pageSizes={this.pageSizes}
          />

          <AddDialouge/>
        
          </Grid>
        
      </Paper>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
      courses:state.courses
  };
};

export default connect(mapStateToProps)(TableList);

