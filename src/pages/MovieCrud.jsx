import { useState } from 'react';
import Navbar from '../components/organisms/Navbar';
import '../style-beranda.css';

export default function MovieCrud({ movies, setMovies }) {
  // state untuk form
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [editingId, setEditingId] = useState(null);

  // pilihan genre
  const genres = ['Aksi', 'Anak-anak', 'Anime', 'Drama', 'Horor', 'Komedi', 'Romantis', 'Sci-Fi', 'Thriller'];

  // simpan data film baru atau edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !genre.trim()) return;

    if (editingId !== null) {
      // ubah film lama
      setMovies(
        movies.map((movie) =>
          movie.id === editingId ? { ...movie, title, genre } : movie
        )
      );
      setEditingId(null);
    } else {
      // tambah film baru (tambahkan di paling kiri / prepend)
      const newMovie = {
        id: Date.now(),
        title,
        genre,
      };
      setMovies([newMovie, ...movies]);
    }

    // reset form
    setTitle('');
    setGenre('');
  };

  // isi form untuk edit
  const handleEdit = (movie) => {
    setEditingId(movie.id);
    setTitle(movie.title);
    setGenre(movie.genre);
  };

  // batal edit
  const handleCancel = () => {
    setEditingId(null);
    setTitle('');
    setGenre('');
  };

  // hapus film
  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-white font-sans flex flex-col pt-20">
      <Navbar />

      <main className="max-w-5xl w-full mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-2 text-white">Kelola Daftar Film</h1>
        <p className="text-gray-400 mb-8">
          Halaman CRUD (Create, Read, Update, Delete) sederhana untuk mengelola daftar film CHILL.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* form tambah atau edit */}
          <div className="bg-[#181a1c] p-6 rounded-xl border border-gray-800 h-fit shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#00c853]">
              {editingId !== null ? 'Edit Film' : 'Tambah Film Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Judul Film</label>
                <input
                  type="text"
                  placeholder="Masukkan judul film"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#222831] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#00c853]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">Genre</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#222831] border border-gray-700 text-white focus:outline-none focus:border-[#00c853]"
                  required
                >
                  <option value="" disabled>Pilih Genre</option>
                  {genres.map((g) => (
                    <option key={g} value={g} className="bg-[#222831]">
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#00c853] hover:bg-[#00e676] text-black font-semibold py-2.5 rounded-lg transition duration-200 cursor-pointer"
                >
                  {editingId !== null ? 'Simpan Perubahan' : 'Tambah Film'}
                </button>
                {editingId !== null && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-200 cursor-pointer"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* tabel daftar film */}
          <div className="md:col-span-2 bg-[#181a1c] p-6 rounded-xl border border-gray-800 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white flex justify-between items-center">
              <span>Daftar Film</span>
              <span className="text-sm font-normal text-gray-400">Total: {movies.length} film</span>
            </h2>

            {movies.length === 0 ? (
              <div className="text-center py-12 text-gray-400 bg-[#121417] rounded-lg border border-dashed border-gray-800">
                Belum ada film. Tambahkan film baru menggunakan formulir di samping.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 text-sm">
                      <th className="pb-3 px-3">ID</th>
                      <th className="pb-3 px-3">Judul Film</th>
                      <th className="pb-3 px-3">Genre</th>
                      <th className="pb-3 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {movies.map((movie) => (
                      <tr key={movie.id} className="hover:bg-gray-800/40 transition">
                        <td className="py-3 px-3 text-xs text-gray-500 font-mono">#{movie.id}</td>
                        <td className="py-3 px-3 font-medium text-white">{movie.title}</td>
                        <td className="py-3 px-3">
                          <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                            {movie.genre}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(movie)}
                              className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 transition cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(movie.id)}
                              className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 transition cursor-pointer"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
