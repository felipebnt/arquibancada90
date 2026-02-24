'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shirt,
  TrendingUp,
  Eye,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Loader2,
  Upload,
  X,
  ImageIcon,
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

export default function AdminDashboard() {
  const router = useRouter();
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJersey, setEditingJersey] = useState<Jersey | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

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

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth');
        const data = await response.json();
        if (!data.authenticated) {
          router.push('/admin');
        }
      } catch {
        router.push('/admin');
      }
    };
    checkAuth();
  }, [router]);

  // Fetch jerseys
  const fetchJerseys = useCallback(async () => {
    try {
      const response = await fetch('/api/jerseys');
      const data = await response.json();
      setJerseys(data);
    } catch (error) {
      console.error('Error fetching jerseys:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJerseys();
  }, [fetchJerseys]);

  // Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Form handlers
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
        const response = await fetch(`/api/jerseys/${editingJersey.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          fetchJerseys();
          setIsDialogOpen(false);
          resetForm();
        }
      } else {
        const response = await fetch('/api/jerseys', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          fetchJerseys();
          setIsDialogOpen(false);
          resetForm();
        }
      }
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
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta camisa?')) return;
    try {
      const response = await fetch(`/api/jerseys/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchJerseys();
      }
    } catch (error) {
      console.error('Error deleting jersey:', error);
    }
  };

  // Handle file upload
  const handleFileUpload = async (file: File, field: 'imageFront' | 'imageBack' | 'imageDetail') => {
    setUploadingField(field);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('type', field.replace('image', '').toLowerCase());

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();
      if (response.ok && data.url) {
        setFormData({ ...formData, [field]: data.url });
      } else {
        alert(data.error || 'Erro ao fazer upload');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erro ao fazer upload da imagem');
    } finally {
      setUploadingField(null);
    }
  };

  // Image upload component
  const ImageUploadField = ({ 
    field, 
    label 
  }: { 
    field: 'imageFront' | 'imageBack' | 'imageDetail'; 
    label: string;
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const value = formData[field];
    const isUploading = uploadingField === field;

    return (
      <div className="space-y-2">
        <Label className="text-sm text-gray-600">{label}</Label>
        
        {/* Preview */}
        {value && (
          <div className="relative w-full h-32 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden mb-2">
            <img 
              src={value} 
              alt={label} 
              className="w-full h-full object-contain p-2"
            />
            <button
              type="button"
              onClick={() => setFormData({ ...formData, [field]: '' })}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Upload Button */}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file, field);
          }}
        />
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isUploading ? 'Enviando...' : 'Upload'}
          </Button>
        </div>

        {/* URL Input */}
        <Input
          value={value}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          placeholder="ou cole a URL aqui..."
          className="border-gray-300 focus:border-gray-900 text-gray-900 placeholder:text-gray-400 text-sm"
        />
      </div>
    );
  };

  // Stats
  const totalJerseys = jerseys.length;
  const featuredCount = jerseys.filter((j) => j.isFeatured).length;
  const activeCount = jerseys.filter((j) => j.isActive).length;

  return (
    <div className="min-h-screen bg-gray-100" style={{ colorScheme: 'light' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-gray-900">Arquibancada</span>
              <span className="text-xl font-bold text-[#00FF9C]">90</span>
              <Badge className="ml-2 bg-[#00FF9C]/10 text-[#00FF9C] border-[#00FF9C]/20">
                Admin
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Ver site
              </a>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 shadow-sm">
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white text-gray-600"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="jerseys"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white text-gray-600"
            >
              Camisas
            </TabsTrigger>
            <TabsTrigger
              value="add"
              className="data-[state=active]:bg-gray-900 data-[state=active]:text-white text-gray-600"
            >
              Adicionar
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel de Gestão</h1>
              <p className="text-gray-600">Gerencie as camisas do mostruário</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                    <Shirt className="w-6 h-6 text-[#00FF9C]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total de Camisas</p>
                    <p className="text-2xl font-bold text-gray-900">{totalJerseys}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Em Destaque</p>
                    <p className="text-2xl font-bold text-gray-900">{featuredCount}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Ativas</p>
                    <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Jerseys */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-900">Últimas Adicionadas</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {isLoading ? (
                  <div className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto" />
                  </div>
                ) : jerseys.length > 0 ? (
                  jerseys.slice(0, 5).map((jersey) => (
                    <div
                      key={jersey.id}
                      className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                          {jersey.imageFront ? (
                            <img
                              src={jersey.imageFront}
                              alt={jersey.name}
                              className="w-full h-full object-contain p-1"
                            />
                          ) : (
                            <Shirt className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{jersey.name}</p>
                          <p className="text-sm text-gray-600">
                            {jersey.club} • {jersey.season}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {jersey.isFeatured && (
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                            Destaque
                          </Badge>
                        )}
                        <Badge variant="outline" className="border-gray-300 text-gray-700">
                          {jersey.type}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center">
                    <Shirt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600">Nenhuma camisa cadastrada</p>
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
                  setIsDialogOpen(true);
                }}
                className="bg-gray-900 text-white hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-gray-700 font-semibold">Nome</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Clube</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Temporada</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Tipo</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                    <TableHead className="text-gray-700 font-semibold text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto" />
                      </TableCell>
                    </TableRow>
                  ) : jerseys.length > 0 ? (
                    jerseys.map((jersey) => (
                      <TableRow key={jersey.id} className="hover:bg-gray-50 border-gray-100">
                        <TableCell className="font-medium text-gray-900">{jersey.name}</TableCell>
                        <TableCell className="text-gray-700">{jersey.club}</TableCell>
                        <TableCell className="text-gray-700">{jersey.season}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-gray-300 text-gray-700">
                            {jersey.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {jersey.isFeatured ? (
                            <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                              Destaque
                            </Badge>
                          ) : jersey.isActive ? (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              Ativa
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-600 border-gray-200">
                              Inativa
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(jersey)}
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(jersey.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <Shirt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-600">Nenhuma camisa cadastrada</p>
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
              <p className="text-gray-600">Preencha os dados da camisa</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">Nome da Camisa</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Camisa Oficial 2026"
                    className="border-gray-300 focus:border-gray-900 text-gray-900 placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="club" className="text-gray-700 font-medium">Clube</Label>
                  <Input
                    id="club"
                    value={formData.club}
                    onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                    placeholder="Ex: Flamengo"
                    className="border-gray-300 focus:border-gray-900 text-gray-900 placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="season" className="text-gray-700 font-medium">Temporada</Label>
                  <Input
                    id="season"
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                    placeholder="Ex: 2026"
                    className="border-gray-300 focus:border-gray-900 text-gray-900 placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-gray-700 font-medium">Tipo</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger className="border-gray-300 text-gray-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="Home" className="text-gray-900">Home</SelectItem>
                      <SelectItem value="Away" className="text-gray-900">Away</SelectItem>
                      <SelectItem value="Third" className="text-gray-900">Third</SelectItem>
                      <SelectItem value="Goleiro" className="text-gray-900">Goleiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-700 font-medium">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="border-gray-300 text-gray-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="Lançamentos" className="text-gray-900">Lançamentos</SelectItem>
                      <SelectItem value="Times Nacionais" className="text-gray-900">Times Nacionais</SelectItem>
                      <SelectItem value="Times Europeus" className="text-gray-900">Times Europeus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="composition" className="text-gray-700 font-medium">Composição do Tecido</Label>
                  <Input
                    id="composition"
                    value={formData.composition}
                    onChange={(e) =>
                      setFormData({ ...formData, composition: e.target.value })
                    }
                    placeholder="Ex: 100% Poliéster"
                    className="border-gray-300 focus:border-gray-900 text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technology" className="text-gray-700 font-medium">Tecnologia</Label>
                  <Input
                    id="technology"
                    value={formData.technology}
                    onChange={(e) =>
                      setFormData({ ...formData, technology: e.target.value })
                    }
                    placeholder="Ex: Dri-FIT"
                    className="border-gray-300 focus:border-gray-900 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <Label className="text-gray-700 font-medium">Imagens</Label>
                <p className="text-sm text-gray-500">Faça upload ou cole a URL da imagem</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ImageUploadField field="imageFront" label="Frente" />
                  <ImageUploadField field="imageBack" label="Verso" />
                  <ImageUploadField field="imageDetail" label="Detalhe" />
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isFeatured: checked })
                    }
                  />
                  <Label htmlFor="isFeatured" className="text-gray-700 font-medium">
                    Em Destaque
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isActive: checked })
                    }
                  />
                  <Label htmlFor="isActive" className="text-gray-700 font-medium">
                    Ativa
                  </Label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#00FF9C] text-gray-900 hover:bg-[#00FF9C]/90 font-semibold"
                >
                  {isSubmitting
                    ? 'Salvando...'
                    : editingJersey
                    ? 'Salvar Alterações'
                    : 'Publicar Camisa'}
                </Button>
                {editingJersey && (
                  <Button type="button" variant="outline" onClick={resetForm} className="border-gray-300 text-gray-700">
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-900">
              {editingJersey ? 'Editar Camisa' : 'Adicionar Nova Camisa'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Nome</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-gray-300 text-gray-900"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Clube</Label>
                <Input
                  value={formData.club}
                  onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                  className="border-gray-300 text-gray-900"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Temporada</Label>
                <Input
                  value={formData.season}
                  onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  className="border-gray-300 text-gray-900"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Tipo</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger className="border-gray-300 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="Home" className="text-gray-900">Home</SelectItem>
                    <SelectItem value="Away" className="text-gray-900">Away</SelectItem>
                    <SelectItem value="Third" className="text-gray-900">Third</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="Lançamentos" className="text-gray-900">Lançamentos</SelectItem>
                    <SelectItem value="Times Nacionais" className="text-gray-900">Times Nacionais</SelectItem>
                    <SelectItem value="Times Europeus" className="text-gray-900">Times Europeus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">URL da Imagem</Label>
                <Input
                  value={formData.imageFront}
                  onChange={(e) =>
                    setFormData({ ...formData, imageFront: e.target.value })
                  }
                  placeholder="https://..."
                  className="border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isFeatured: checked })
                  }
                />
                <Label className="text-gray-700">Destaque</Label>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-gray-300 text-gray-700"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#00FF9C] text-gray-900 hover:bg-[#00FF9C]/90 font-semibold"
              >
                {editingJersey ? 'Salvar' : 'Adicionar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
