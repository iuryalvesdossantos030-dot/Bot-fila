export function isOwner(interaction) {
  return interaction.guild.ownerId === interaction.user.id;
}
