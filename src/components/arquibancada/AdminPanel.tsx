'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Image as ImageIcon, 
  Shirt, 
  TrendingUp,
  Eye
} from 'lucide-react';

interface Jersey {
  id: string;
  name: string;
  club: string;
  season: string;
  type: string;
  category: string;
  composition?: string;
  technology?: string;
  imageFront?: string;
  imageBack?: string;
  imageDetail?: string;
  isFeatured?: boolean;
  isActive?: boolean;
}

interface AdminPanelProps {
  jerseys: Jersey[];
  onAddJersey: (jersey: Omit<Jersey, 'id'>) => Promise<void>;
  onUpdateJersey: (id: string, jersey: Partial<Jersey>) => Promise<void>;
  onDeleteJersey: (id: string) => Promise<void>;
  onClose?: () => void;
}

export function AdminPanel({ 
  jerseys, 
  onAddJersey, 
  onUpdateJersey, 
  onDeleteJersey,
  onClose 
}: AdminPanelProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingJersey, setEditingJersey] = useState<Jersey | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    club: '',
    season: '',
    type: 'Home',
    category: 'Times Nacionais',
    composition: '',
    technology: '',
    imageFront: '',
    imageBack: '',
    imageDetail: '',
    isFeatured: false,
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      club: '',
      season: '',
      type: 'Home',
      category: 'Times Nacionais',
      composition: '',
      technology: '',
      imageFront: '',
      imageBack: '',
      imageDetail: '',
      isFeatured: false,
      isActive: true,
    });
    setEditingJersey(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (editingJersey) {
        await onUpdateJersey(editingJersey.id, formData);
      } else {
        await onAddJersey(formData);
      }
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving jersey:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (jersey: Jersey) => {
    setEditingJersey(jersey);
    setFormData({
      name: jersey.name,
      club: jersey.club,
      season: jersey.season,
      type: jersey.type,
      category: jersey.category,
      composition: jersey.composition || '',
      technology: jersey.technology || '',
      imageFront: jersey.imageFront || '',
      imageBack: jersey.imageBack || '',
      imageDetail: jersey.imageDetail || '',
      isFeatured: jersey.isFeatured || false,
      isActive: jersey.isActive ?? true,
    });
    setIsAddDialogOpen(true);
  };

  const totalJerseys = jerseys.length;
  const featuredCount = jerseys.filter(j => j.isFeatured).length;
  const recentCount = jerseys.filter(j => {
    // Consider recent if created in last 7 days
    return true; // Simplified for demo
  }).length;

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-gray-900">Arquibancada</span>
              <span className="text-xl font-bold text-[#00FF9C]">90</span>
              <Badge variant="outline" className="ml-2">Admin</Badge>
            </div>
            {onClose && (
              <Button variant="ghost" onClick={onClose} className="text-gray-600">
                Voltar ao Site
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="jerseys" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              Camisas
            </TabsTrigger>
            <TabsTrigger value="add" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              Adicionar
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel de Gestão</h1>
              <p className="text-gray-500">Gerencie as camisas do mostruário</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                    <Shirt className="w-6 h-6 text-[#00FF9C]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total de Camisas</p>
                    <p className="text-2xl font-bold text-gray-900">{totalJerseys}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Em Destaque</p>
                    <p className="text-2xl font-bold text-gray-900">{featuredCount}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00FF9C]/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-[#00FF9C]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ativas</p>
                    <p className="text-2xl font-bold text-gray-900">{totalJerseys}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Jerseys */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Últimas Adicionadas</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {jerseys.slice(0, 5).map((jersey) => (
                  <div key={jersey.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                        {jersey.imageFront ? (
                          <img src={jersey.imageFront} alt={jersey.name} className="w-full h-full object-contain p-1" />
                        ) : (
                          <Shirt className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{jersey.name}</p>
                        <p className="text-sm text-gray-500">{jersey.club} • {jersey.season}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {jersey.isFeatured && (
                        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Destaque</Badge>
                      )}
                      <Badge variant="outline" className="border-gray-200 text-gray-600">{jersey.type}</Badge>
                    </div>
                  </div>
                ))}
                {jerseys.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <Shirt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhuma camisa cadastrada</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Jerseys List Tab */}
          <TabsContent value="jerseys" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Lista de Camisas</h2>
              <Button
                onClick={() => {
                  resetForm();
                  setIsAddDialogOpen(true);
                }}
                className="bg-gray-900 text-white hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-gray-600">Nome</TableHead>
                    <TableHead className="text-gray-600">Clube</TableHead>
                    <TableHead className="text-gray-600">Temporada</TableHead>
                    <TableHead className="text-gray-600">Tipo</TableHead>
                    <TableHead className="text-gray-600">Status</TableHead>
                    <TableHead className="text-gray-600 text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jerseys.map((jersey) => (
                    <TableRow key={jersey.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{jersey.name}</TableCell>
                      <TableCell className="text-gray-600">{jersey.club}</TableCell>
                      <TableCell className="text-gray-600">{jersey.season}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-200 text-gray-600">
                          {jersey.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {jersey.isFeatured ? (
                          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                            Destaque
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50">
                            Ativa
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(jersey)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteJersey(jersey.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {jerseys.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <Shirt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Nenhuma camisa cadastrada</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Add Jersey Tab */}
          <TabsContent value="add" className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {editingJersey ? 'Editar Camisa' : 'Adicionar Nova Camisa'}
              </h2>
              <p className="text-gray-500">Preencha os dados da camisa</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Camisa</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Camisa Oficial 2026"
                    required
                  />
                </div>

                {/* Club */}
                <div className="space-y-2">
                  <Label htmlFor="club">Clube</Label>
                  <Input
                    id="club"
                    value={formData.club}
                    onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                    placeholder="Ex: Flamengo"
                    required
                  />
                </div>

                {/* Season */}
                <div className="space-y-2">
                  <Label htmlFor="season">Temporada</Label>
                  <Input
                    id="season"
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                    placeholder="Ex: 2026"
                    required
                  />
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Away">Away</SelectItem>
                      <SelectItem value="Third">Third</SelectItem>
                      <SelectItem value="Goleiro">Goleiro</SelectItem>
                      <SelectItem value="Treino">Treino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lançamentos">Lançamentos</SelectItem>
                      <SelectItem value="Times Nacionais">Times Nacionais</SelectItem>
                      <SelectItem value="Times Europeus">Times Europeus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Composition */}
                <div className="space-y-2">
                  <Label htmlFor="composition">Composição do Tecido</Label>
                  <Input
                    id="composition"
                    value={formData.composition}
                    onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                    placeholder="Ex: 100% Poliéster"
                  />
                </div>

                {/* Technology */}
                <div className="space-y-2">
                  <Label htmlFor="technology">Tecnologia</Label>
                  <Input
                    id="technology"
                    value={formData.technology}
                    onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                    placeholder="Ex: Dri-FIT"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <Label>Imagens</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="imageFront" className="text-sm text-gray-500">Frente (URL)</Label>
                    <Input
                      id="imageFront"
                      value={formData.imageFront}
                      onChange={(e) => setFormData({ ...formData, imageFront: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imageBack" className="text-sm text-gray-500">Verso (URL)</Label>
                    <Input
                      id="imageBack"
                      value={formData.imageBack}
                      onChange={(e) => setFormData({ ...formData, imageBack: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imageDetail" className="text-sm text-gray-500">Detalhe (URL)</Label>
                    <Input
                      id="imageDetail"
                      value={formData.imageDetail}
                      onChange={(e) => setFormData({ ...formData, imageDetail: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                  />
                  <Label htmlFor="isFeatured" className="text-sm">Em Destaque</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label htmlFor="isActive" className="text-sm">Ativa</Label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#00FF9C] text-gray-900 hover:bg-[#00FF9C]/90"
                >
                  {isSubmitting ? 'Salvando...' : editingJersey ? 'Salvar Alterações' : 'Publicar Camisa'}
                </Button>
                {editingJersey && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>{editingJersey ? 'Editar Camisa' : 'Adicionar Nova Camisa'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dialog-name">Nome</Label>
                <Input
                  id="dialog-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dialog-club">Clube</Label>
                <Input
                  id="dialog-club"
                  value={formData.club}
                  onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dialog-season">Temporada</Label>
                <Input
                  id="dialog-season"
                  value={formData.season}
                  onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Away">Away</SelectItem>
                    <SelectItem value="Third">Third</SelectItem>
                    <SelectItem value="Goleiro">Goleiro</SelectItem>
                    <SelectItem value="Treino">Treino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lançamentos">Lançamentos</SelectItem>
                    <SelectItem value="Times Nacionais">Times Nacionais</SelectItem>
                    <SelectItem value="Times Europeus">Times Europeus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dialog-imageFront">URL da Imagem</Label>
                <Input
                  id="dialog-imageFront"
                  value={formData.imageFront}
                  onChange={(e) => setFormData({ ...formData, imageFront: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                />
                <Label className="text-sm">Destaque</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#00FF9C] text-gray-900 hover:bg-[#00FF9C]/90">
                {editingJersey ? 'Salvar' : 'Adicionar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
