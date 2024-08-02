import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Ticket } from '@prisma/client'

interface DataTableProps {
  tickets: Ticket[]
}

const DataTable = ({
  tickets,
}: DataTableProps ) => {
  console.log(tickets,'tickets')
  return (
    <div className='w-full mt-5'>
      <div className='rounded-md sm:border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Title
              </TableHead>
              <TableHead>
                status
              </TableHead>
              <TableHead>
                priority
              </TableHead>
              <TableHead>
                created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              tickets ? tickets.map(ticket => (
                <TableRow key={ticket.id} data-href="/">
                  <TableCell>
                    {ticket.name}
                  </TableCell>
                  <TableCell>
                    {ticket.status}
                  </TableCell>
                  <TableCell>
                    {ticket.priority}
                  </TableCell>
                  <TableCell>
                    {ticket.createdAt.toString()}
                  </TableCell>
                </TableRow>
              )) : null
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable