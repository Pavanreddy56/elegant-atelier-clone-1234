import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Eye } from "lucide-react";

const Customers = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock customers - replace with real API
  const customers = [
    { 
      id: 1, 
      name: "John Doe", 
      email: "john@example.com",
      orders: 12,
      totalSpent: "$2,450.00",
      status: "active",
      joinDate: "2023-06-15" 
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      email: "jane@example.com",
      orders: 8,
      totalSpent: "$1,820.00",
      status: "active",
      joinDate: "2023-08-22" 
    },
    { 
      id: 3, 
      name: "Bob Johnson", 
      email: "bob@example.com",
      orders: 5,
      totalSpent: "$890.00",
      status: "active",
      joinDate: "2023-11-10" 
    },
    { 
      id: 4, 
      name: "Alice Brown", 
      email: "alice@example.com",
      orders: 15,
      totalSpent: "$3,200.00",
      status: "vip",
      joinDate: "2023-03-05" 
    },
  ];

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Customers</h1>
          <p className="text-muted-foreground">View and manage customer accounts</p>
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                  <TableCell>{customer.joinDate}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "vip" ? "default" : "secondary"}>
                      {customer.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <WhatsAppButton />
    </div>
  );
};

export default Customers;
