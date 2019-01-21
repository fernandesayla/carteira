import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import { Link } from 'react-router-dom';

import moment from 'moment';
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}
const rows = [
  { id: 'carteira', disablePadding: true, numeric: true, label: 'Carteira' },
  { id: 'gecex', disablePadding: true, label: 'Gecex' },
  { id: 'nome_reduzido', disablePadding: true, label: 'Nome Gecex' },

  { id: 'genin', disablePadding: true, label: 'Genin' },
  { id: 'nome_genin', disablePadding: true, label: 'Nome Genin' },

  { id: 'descricao_segmento', disablePadding: true, label: 'Segmento' },
  { id: 'descricao_situacao', disablePadding: true, label: 'Situação' },
  { id: 'qtd_clientes', disablePadding: true, label: 'Qtd  Clientes' },
  { id: 'dt_create', disablePadding: true, label: 'Data Criação' }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    const header = {
      padding: '0px 0px 0px 8px'
    };
    return (
      <TableHead>
        <TableRow>
          {rows.map((row, index) => {
            return (
              <TableCell
                alignCenter
                key={index}
                padding={row.disablePadding ? 'none' : 'default'}
                style={header}
                sortDirection={orderBy === row.gecex ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === row.gecex}
                    direction={order}
                    onClick={this.createSortHandler(row.gecex)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,

  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2
  },

  tableWrapper: {
    overflowX: 'auto'
  },
  cell: {
    padding: '0px 0px 0px 8px',
    textDecoration: 'none'
  }
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'id',
      selected: {},
      page: 0,
      rowsPerPage: 5
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { data, classes } = this.props;

    const { order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={n.index}
                      style={{ textDecoration: 'none' }}
                      component={Link}
                      to={{
                        pathname: `/carteira/${n.gecex}/${n.carteira}`,
                        state: { carteira: n }
                      }}
                    >
                      <TableCell paddingNone className={classes.cell}>
                        {n.carteira}
                      </TableCell>
                      <TableCell paddingNone className={classes.cell}>
                        {n.gecex}
                      </TableCell>
                      <TableCell paddingNone className={classes.cell}>
                        {n.nome_reduzido}
                      </TableCell>
                      <TableCell paddingNone className={classes.cell}>
                        {n.genin}
                      </TableCell>

                      <TableCell paddingNone className={classes.cell}>
                        {n.nome_genin}
                      </TableCell>

                      <TableCell paddingNone className={classes.cell}>
                        {n.descricao_segmento}
                      </TableCell>
                      <TableCell paddingNone className={classes.cell}>
                        {n.descricao_situacao}
                      </TableCell>
                      <TableCell paddingNone className={classes.cell}>
                        {n.qtd_clientes}
                      </TableCell>
                      <TableCell paddingNone className={classes.cell}>
                        {moment(n.dt_create).format('LL')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Anterior'
          }}
          nextIconButtonProps={{
            'aria-label': 'Próxima'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
