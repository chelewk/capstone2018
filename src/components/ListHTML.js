import React from 'react';
import Paper from 'material-ui/Paper';
import {
    SortingState,
    IntegratedSorting,
    PagingState,
    IntegratedPaging,
    FilteringState,
    IntegratedFiltering,
    EditingState,
    GroupingState,
    IntegratedGrouping,
    RowDetailState
  } from '@devexpress/dx-react-grid';
 
  import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    TableFilterRow,
    TableSelection,
    DragDropProvider,
    TableColumnReordering,
    TableColumnResizing,
    TableEditRow,
    TableGroupRow,
    GroupingPanel,
    ColumnChooser,
    TableColumnVisibility,
    Toolbar,
    TableEditColumn,
    TableRowDetail,
  } from '@devexpress/dx-react-grid-material-ui';
  import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle
  } from "material-ui/Dialog";
import {connect} from 'react-redux';
import {compose} from 'redux';
import {TableCell} from 'material-ui';
import AppBar from 'material-ui/AppBar';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';

import EditPopupPlugin from './EditPopupPlugin';
import EditDialouge from './EditDialouge';
import AddButton from './AddButton';
import AddDialouge from './AddDialouge';
import LogView from './event/LogView';

const getRowId = row => row.id;
const RowDetail = ({ row }) => {
  return(
    <div>
    <p>Here are the log for this event:</p>
      <LogView row={row}/>
    </div>
  );
  
};

class ListHTML extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tableColumnExtensions: [
        { columnName: 'id', width: 60 },
      ],
      hiddenColumnNames: [],
      grouping: [],
      currentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15],
      expandedRowIds: [2, 5],
    };

    this.changeExpandedDetails = expandedRowIds => this.setState({ expandedRowIds });
    this.hiddenColumnNamesChange = (hiddenColumnNames) => {
        this.setState({ hiddenColumnNames });
    };
    this.changeGrouping = grouping => this.setState({ grouping });
    this.changeEditingRowIds = this.changeEditingRowIds.bind(this);
    this.changeSelection = selection => this.setState({ selection });
  }
  
  changeEditingRowIds(editingRowIds) {
    this.setState({ editingRowIds });
  }
  logInfo=()=>{
    return(
      <div>
      <RowDetailState
            expandedRowIds={this.state.expandedRowIds}
            onExpandedRowIdsChange={this.changeExpandedDetails}
          />
        </div>
    );
  }

  detailRow=()=>{
    return(
      <TableRowDetail
      contentComponent={RowDetail}
    />
    );
  }

  showEdit=()=>{
    const pathname = this.props.pathname;
    if(pathname==="log"){
      return false
    }
    else {
      return true;
    }
  };

  showDelete=()=>{
    const pathname = this.props.pathname;
    if(pathname==="/course"){
      return false
    }
    else {
      return true;
    }
  };

  showTableEdit=()=>{
    const pathname = this.props.pathname;
    if(pathname==="/course"){
      return;
    }
    else {
      return(
        <div>
        <TableEditColumn
            showEditCommand={this.showEdit()}
            showDeleteCommand={this.showDelete()}
          />
          <AddDialouge pathname={this.props.pathname}/>
          </div>
      );
    }

    
  };

  render() {
    const { grouping,hiddenColumnNames,tableColumnExtensions,expandedRowIds } = this.state;
    const { columns,columnWidths,columnOrder,rowsItem,commitChanges } = this.props;
    const { classes } = this.props;
    return (

     <Paper>
        <Grid
          rows={rowsItem}
          columns={columns}
          getRowId={getRowId}
        >
        
        {(this.props.pathname==="/events") ? this.logInfo(): null }
          <SortingState
            defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
          />
          <DragDropProvider />
          <GroupingState
          grouping={grouping}
          onGroupingChange={this.changeGrouping}
        />
          <IntegratedSorting />
          <PagingState
            currentPage={this.currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={this.pageSize}
            onPageSizeChange={this.changePageSize}
          />
          
          <IntegratedPaging />
          <FilteringState
            filters={this.filters}
            onFiltersChange={this.changeFilters}
          />
          <IntegratedFiltering />
          
          <EditingState
            onCommitChanges={commitChanges}
            columnExtensions={[
              {columnName:'date', editingEnabled:false},
            ]}
          />
            <DragDropProvider />
            <IntegratedGrouping />
          <Table columnExtensions={tableColumnExtensions}
          />
          <TableColumnResizing
            columnWidths={columnWidths}
            onColumnWidthsChange={this.changeColumnWidths}
          />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={this.changeColumnOrder}
          />
          <TableHeaderRow showSortingControls />

          {(this.props.pathname==="/events") ?
            <TableRowDetail
            contentComponent={RowDetail}
          />: null}

          <TableColumnVisibility
            hiddenColumnNames={hiddenColumnNames}
            onHiddenColumnNamesChange={this.hiddenColumnNamesChange}
          />
          <TableGroupRow />
          <Toolbar />
          <GroupingPanel showGroupingControls />
          <ColumnChooser />

          {this.showTableEdit()}
          <EditPopupPlugin pathname={this.props.pathname} popupComponent={EditDialouge} />
          <TableFilterRow />
          <PagingPanel
            pageSizes={this.pageSizes}
          />

            
        
          </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
            auth:state.auth
  };
};

export default connect(mapStateToProps)(ListHTML);

