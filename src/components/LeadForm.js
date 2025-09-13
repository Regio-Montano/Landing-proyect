const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;
  setSubmitted(false);
  setError('');
  setLoading(true);

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      setSubmitted(true);
    } else {
      throw new Error(result.error || 'Error al enviar los datos');
    }
  } catch (err) {
    console.error('Error en submit:', err);
    setError('No se pudo enviar el formulario, intenta de nuevo.');
  } finally {
    setLoading(false);
  }
};
export default LeadForm;
